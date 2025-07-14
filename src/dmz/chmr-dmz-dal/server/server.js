import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ReportRouter from './routes/Report.js';
import managementRouter from './routes/ReportManagement.js';
import './redisClient.js';
import path from "path";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/files', express.static(path.resolve('files')));
app.use('/report', ReportRouter);
app.use('/report/management', managementRouter);

// Handle undefined routes (404)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
  
// Global error-handling
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});

export default app; // Export the app instance

// Start the server only if this file is executed directly
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT_DMZ_DAL || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}