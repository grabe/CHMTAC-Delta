import express from 'express';
import redisClient from '../redisClient.js';
import { STATUS_ENUM } from '../../common/constants/statusEnum.js';
import path from "path";
import fs from "fs/promises"

const managementRouter = express.Router();

async function keyFor(id) {
  for (const p of ["Report", "DoD Report", "Civilian Report"]) {
    const k = `${p}:${id}`;
    if (await redisClient.exists(k)) return k;
  }
  return null;
}

function normaliseFiles(arr = []){
  return arr.map(f=> typeof f === "string"? {filename:f, originalName: f} : f);

}

// Get reports by status, if no status is provided, return all reports
// Example: GET /report/management?status=initialized
managementRouter.get('/', async (req, res) => {
    try {
      // Getting the query parameters with defaults
      const { 
        status, 
        sortField = "submittedAt", 
        sortOrder = "asc", 
        start = 0, 
        max = 25 
      } = req.query;
  
      // Validate status if provided
      if (status && !Object.values(STATUS_ENUM).includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${Object.values(STATUS_ENUM).join(', ')}` });
      }
  
      const keys = await redisClient.keys('*Report:*');
      const reports = await Promise.all(keys.map(key => redisClient.get(key)));
      const filteredReports = reports
        .map(report => JSON.parse(report))
        .filter(report => !status || report.status === status);
  
      const sOrder = sortOrder === "asc" ? 1 : -1;
      filteredReports.sort((a, b) => {
          let aVal = a[sortField];
          let bVal = b[sortField];
          
        
          if (sortField === "submittedAt") {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
          }
          
          if (aVal < bVal) return -1 * sOrder;
          if (aVal > bVal) return 1 * sOrder;
          return 0;
      });
      

      const startNum = parseInt(start);
      const maxNum = parseInt(max);
      const totalCount = filteredReports.length;
      const paginatedReports = filteredReports.slice(startNum, startNum + maxNum);
  
      res.status(200).json({totalCount, reports: paginatedReports});
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Server Error' });
    }
});
  
// Get a single report by ID
managementRouter.get('/:id', async (req, res) => {
    try {
      const key = await keyFor(req.params.id);
      if(!key) return res.status(404).json({error: "Report not found"});
      const report = await redisClient.get(key);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      const parsed = JSON.parse(report)
      parsed.filereferences = normaliseFiles(parsed.filereferences);
      res.status(200).json(parsed);
    } catch (error) {
      console.error('Error fetching report:', error);
      res.status(500).json({ error: 'Server Error' });
    }
});
  
// Update a report by ID
managementRouter.put('/:id', async (req, res) => {
  try {
    const key = await keyFor(req.params.id);
    if (!key) return res.status(404).json({ error: "Report not found" });
    
    const current = JSON.parse(await redisClient.get(key));
    const updatedData = { ...current, ...req.body };
    await redisClient.set(key, JSON.stringify(updatedData));
    res.status(200).json({ message: 'Report updated successfully', report: updatedData });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});
  
// Delete a report by ID
managementRouter.delete('/:id', async (req, res) => {
  try {
    const key = await keyFor(req.params.id);
    if (!key) return res.status(404).json({ error: "Report not found" });
    await redisClient.del(key);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

const FILE_DIR =  "/usr/server/app/files";

managementRouter.get("/files/:filename", async (req, res) => {
  try {
    const fname = req.params.filename;
    const abs   = path.join(FILE_DIR, fname);
    await fs.access(abs);
    res.download(abs, fname);        
  } catch (err) {
    res.status(404).json({ error: "File not found" });
  }
});
  
export default managementRouter;
