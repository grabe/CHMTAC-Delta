import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ReportRouter from './routes/Report.js';
import managementRouter from './routes/ReportManagement.js';
import './redisClient.js';
import path from "path";

const pgHost = process.env.HOST_POSTGRES;
const port = process.env.PORT_DMP_DAL;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/report", ReportRouter);
app.use('/report/management', managementRouter);

const PORT = process.env.PORT_DMZ_DAL || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
