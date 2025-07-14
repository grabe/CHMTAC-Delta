# DMZ-DAL Documentation

## Overview
The `dmz-dal` (Data Access Layer) is a Node.js/Express service that acts as the backend for the CHMR system. It handles API requests, processes data, and interacts with Redis for temporary data storage. This service is responsible for managing reports submitted via the intake web application and providing APIs for report maintenance.

---

## Key Features
1. **Report Submission**:
   - Accepts civilian and DoD reports via the `/report` endpoint.
   - Validates required fields based on the report type (Civilian or DoD).
   - Supports file uploads (up to 5GB per file, max 5 files).
   - Stores reports and metadata in Redis.

2. **Report Management**:
   - Provides APIs to fetch, update, and delete reports via `/report/management`.
   - Supports filtering, sorting, and pagination for reports.
   - Allows downloading of uploaded files.

3. **Rate Limiting**:
   - Protects endpoints from abuse using Redis-backed rate limiting.

4. **Middleware**:
   - Includes middleware for validation, rate limiting, and user-agent filtering.

---

## Directory Structure

- **chmr-dmz-dal/**
  - **server/**
    - `constants/` - Shared constants (status enums)
    - `middleware/` - Custom middleware (validation, rate limiting, etc.)
    - `routes/` - API route handlers (Report, ReportManagement)
    - `redisClient.js` - Redis client configuration
    - `server.js` - Main Express server entry point
  - `files/` - Directory for storing uploaded files
  - `.dockerignore` - Docker ignore rules
  - `Dockerfile` - Dockerfile for building the service
  - `package.json` - Node.js dependencies and scripts
  - `.env` - Environment variables (mostly for setting ports)

---

## Endpoints

### Report Submission (`/report`)
- **POST `/report`**:
  - Accepts form data with required fields and optional file uploads.
  - Validates fields based on the `type` query parameter (`DOD` or `CIVILIAN`).
  - Stores the report in Redis with a unique ID.
  - Example Response:
  ```
    "message": "Report Submitted!",
    "reportID": "163e4567-e89b-12d3-a456-426614174000"
  ```

### Report Management (`/report/management`)
- **GET `/report/management`**:
  - Fetches reports with optional filters (`status`, `sortField`, `sortOrder`, `start`, `max`).
  - Supports pagination and sorting.
- **GET `/report/management/:id`**:
  - Fetches a single report by ID.
- **PUT `/report/management/:id`**:
  - Updates a report's status or other fields.
- **DELETE `/report/management/:id`**:
  - Deletes a report by ID.
- **GET `/report/management/files/:filename`**:
  - Downloads a file by its filename.

---

## Middleware

1. **`CivValidateRequiredFields.js`**:
   - Ensures all required fields for civilian reports are present.
   - Returns a `400` error if any field is missing.

2. **`DodValidateRequiredFields.js`**:
   - Ensures all required fields for DoD reports are present.
   - Returns a `400` error if any field is missing.

3. **`validateReport.js`**:
   - Checks for honeypot fields to detect and block bots.

4. **`rateLimiter.js`**:
   - Limits each IP to 10 requests per minute using Redis as the store.

5. **`useragentfilter.js`**:
   - Blocks requests from known bot user-agents (e.g., `curl`, `wget`).

---

## Redis Integration

- **Purpose**:
  - Temporary storage for reports and metadata.
  - Used for rate limiting.
- **Configuration**:
  - Redis URL is set via the `HOST_REDIS` environment variable.
- **Key Structure**:
  - Civilian reports: `Civilian Report:<UUID>`
  - DoD reports: `DoD Report:<UUID>`

---

## File Uploads

- **Storage**:
  - Files are stored in the `files/` directory.
  - Filenames are prefixed with a timestamp to ensure uniqueness.
- **Limits**:
  - Max file size: 5GB.
  - Max files per report: 5.
- **Access**:
  - Files can be downloaded via `/report/management/files/:filename`.

---

## Environment Variables

### Backend Variables:
- `HOST_REDIS`: Redis connection string (e.g., `redis://localhost:6379`).
- `PORT`: Port for the Express server (default: `5000`).

### Frontend Variables:
- `REACT_APP_API_BASE_URL`: Base URL for API requests.
- `REACT_APP_DAL_HOST`: Host URL for file downloads.

---

## Docker Setup

- **Dockerfile**:
  - Uses `node:23-slim` as the base image.
  - Installs dependencies and sets up the application.
  - Exposes port `5000`.
- **Volumes**:
  - The `files/` directory is mounted as a volume to persist uploaded files.

---

## Points to Note

1. **Redis Connection Errors**:
   - Ensure the `HOST_REDIS` variable is correctly set.
   - Verify that the Redis container is running and accessible.

2. **File Upload**:
   - May need to adjust max file size down to 1 or 2 GB to prevent large uploads.
   - Ensure the `files/` directory exists and has the correct permissions.

3. **Rate Limiting**:
   - May need to adjust this lower (fewer requests per minute) for production builds.
   - If rate limiting blocks valid requests, adjust the `max` or `windowMs` values in `rateLimiter.js`.

---

## Future Improvements
- Impliment more security features.
- Add back unit tests for middleware and routes.
- Enhance error handling and logging for better debugging.

---