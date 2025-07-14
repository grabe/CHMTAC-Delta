import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../redisClient.js';
import CivValidateRequiredFields from '../middleware/CivValidateRequiredFields.js';
import DodValidateRequiredFields from '../middleware/DodValidateRequiredFields.js';
import { STATUS_ENUM } from '../../common/constants/statusEnum.js';
import validateReport from '../middleware/validateReport.js';
import useragentfilter from '../useragentfilter.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const ReportRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function setReportUID(req, _res, next){
  if(!req.reportUID) req.reportUID = uuidv4();
  next(); 
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const now = new Date();
    const dateFolder =
      String(now.getDate()).padStart(2, '0') + '-' +
      now.toLocaleString('en-US', { month: 'short' }) + '-' +
      now.getFullYear();

    const destDir = path.join(
      __dirname, '..', '..', 'files',
      dateFolder,
      req.reportUID               
    );

    fs.mkdirSync(destDir, { recursive: true });
    cb(null, destDir);
  },

  filename: (_req, file, cb) => {
    cb(null, file.originalname);    
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // Limit file size to 5GB
});

function captureInfo(req, res, next) {
  const ipaddress = req.ip;
  const devicetype = "";
  const routeAccessed = req.originalUrl || req.url;

  req.visitorData = {
      ipaddress,
      devicetype,
      routeAccessed,
      accessedAT: new Date().toISOString(),
  };

  next();
}

function pickValidator(req, res, next) {
  const t = (req.query.type || "").toUpperCase();
  
  if (t === "DOD") {
    return DodValidateRequiredFields(req, res, next);
  }
  if (t === "CIVILIAN") {
    return CivValidateRequiredFields(req, res, next);
  }

  // Catch all invalid or missing type cases
  console.error("Invalid or missing type. Must be 'DOD' or 'CIVILIAN'", {
    query: req.query,
    body: req.body,
    files: req.files,
  });
  return res.status(400).json({
    error: "Invalid or missing type. Must be 'DOD' or 'CIVILIAN'",
    debug: { query: req.query, body: req.body, files: req.files },
  });
}

async function submitReport(req, res) {
  try {
    const type = req.query.type.toUpperCase();
    const reportID = req.reportUID;

    // Handle file references
    let filereferences = [];
    if (req.files && req.files.length > 0) {
        filereferences = req.files.map((file) => ({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        }));
    }

    const reportData = {
      id: reportID,
      ...req.body,
      ...req.visitorData,
      contactType: type,
      status: STATUS_ENUM.SUBMITTED,
      filereferences,
      submittedAt: new Date().toISOString(),
      confidence_level: parseInt(process.env.CHIR_CONFIDENCE_LEVEL, 10) || 1, // Default to civilian if not set
    };
    
    // Log the data before storing it in Redis
    console.log(`Storing ${type} Report Data:`, reportData);

    // Store data in Redis
    const keyPrefix = type === "DOD" ? "DoD Report:" : "Civilian Report:";
    await redisClient.set(`${keyPrefix}${reportID}`, JSON.stringify(reportData));

    return res.status(200).json({
      message: 'Report Submitted!',
      reportID,
    });
  } catch (err) {
    console.error('Error', err);
    return res.status(500).json({ error: 'Server Error' });
  }
}

// Logging middleware to capture incoming request data
function logRequestData(req, res, next) {
  console.log('--- Incoming Request Data ---');
  console.log('Query:', req.query); // Logs query parameters
  console.log('Body:', req.body);   // Logs parsed form fields
  
  if (req.files) {
    console.log('Files:', req.files.map(f => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      size: f.size,
      mimetype: f.mimetype
    })));
  } else {
    console.log('Files: None');
  }
  
  console.log('Visitor Data:', req.visitorData); // Logs additional visitor data (if available)
  console.log('-----------------------------');
  next(); // Pass control to the next middleware
}

ReportRouter.post(
    '/',
    captureInfo, // Log request details (moved before file upload)
    useragentfilter, // Filter based on user-agent
    setReportUID, // Set a unique nonpublic report ID
    upload.array('document_files', 5), // Handle file uploads with the correct field name
    logRequestData, // Log request data after files are processed
    pickValidator, // Validate required fields
    validateReport, // Validate report structure
    submitReport // Handle the core business logic
  );

ReportRouter.use((err, req, res, next) => {
  console.error('Error in report router:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message, code: err.code });
  }
  if (err) {
    return res.status(500).json({ error: 'Server Error', message: err.message });
  }
  next();
});

export default ReportRouter;