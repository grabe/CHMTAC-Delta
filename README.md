# CHMTAC (Civilian Harm DMP Tactical) Delta

CHMTAC is a containerized, multi-service application designed to intake reports of civilian harm, manage them, analyze data, and provide tools for mitigating civilian harm. This project consists of several microservices, including frontend applications, backend services, and supporting infrastructure.

---

## **Table of Contents**
- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## **Overview**
CHMTAC is the tactical version of the CHMR DMP. It is built to scale the reporting, management, and analysis of civilian harm incidents. This repo is for preproduction release Delta only, which is not the full DMP.

It includes:
- A frontend for submitting and managing reports.
- A backend for processing and storing data.
   - Redis for temporary data isolation and staging.
   - Postgres for permanent data storage and lifecycle management.
- Docker Compose for deployment and local development.

---

## **Architecture**
![image](https://github.com/user-attachments/assets/6f655d96-f03f-4865-ba3b-a2d41c46e60a)


The architecture is partitioned into individual containers:

1. **Frontend (`chmr-intake-web`)**:
   - DoD or Public web form for submitting a report of civilian harm.
   - Spam-bot counter measures.
   - JSON form data validation (valid JSON).
   - Sends JSON form data and uploaded files to the DAL (chmr-dmz-dal).

2. **Report Maintenance (`chmr-dmz-maint`)**:
   - A React-based application for managing reports.
   - Web form to manually determine disposition of reports.
   - Performs maintenance:
      - Send reports marked to discard to archive.
      - Send reports not promotable to another system with interest.
   - Communicates with chmr-dmz-dal.

3. **Data access layer (`chmr-dmz-dal`)**:
   - A Node.js/Express service for handling API requests and interacting with the database.
   - Runs on port `5000`.

4. **Redis (`chmr-dmz-redis`)**:
   - Used for caching and session management.
   - Runs on port `6379`.

---

## **Setup and Installation**

### **Prerequisites**
- Docker and Docker Compose installed on your machine.
- Node.js (for local development of individual services).

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/QBE-CHMR/CHMTAC-Delta.git
   cd CHMTAC-Delta

2. Start all services using Docker Compose:
   ```bash
   docker-compose up --build -d

3. Access the services:
   - **Web page to report civilian harm**: [http://localhost:${DMZ_INTAKE_PORT}](http://localhost:${DMZ_INTAKE_PORT})
   - **Report Maintenance**: [http://localhost:${DMZ_MAINT_PORT}](http://localhost:${DMZ_MAINT_PORT})

---

## **Usage**

### **Submitting a Report**
1. Navigate to the frontend (`chmr-intake-web`) at [http://localhost:${DMZ_INTAKE_PORT}](http://localhost:${DMZ_INTAKE_PORT}).
2. Fill out the report form and submit it.

### **Managing Reports**
1. Navigate to the report manager (`chmr-dmz-maint`) at [http://localhost:${DMZ_MAINT_PORT}](http://localhost:${DMZ_MAINT_PORT}).
2. Use the filters and sorting options to manage reports.

---

## **Environment Variables**
The following environment variables are used in the project:

### **Frontend (`chmr-intake-web`)**
- `REACT_APP_CHIR_CONTACT_TYPE`: Choose which form contact info to include (DOD or CIVILIAN).
- `REACT_APP_API_BASE_URL`: Base URL for the backend API.

### **Report Manager (`chmr-dmz-maint`)**
- `REACT_APP_API_BASE_URL`: Base URL for the backend API.

### **Backend (`chmr-dmz-dal`)**
- `REDIS_URL`: URL for the Redis instance (e.g., `redis://chmr-dmz-redis:6379`).
- `NODE_ENV`: Set to `production` or `development`.


