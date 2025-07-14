# CHMTAC (Maintaince Web Page) Charlie

The maintaince web page is a react-based web page designed to view, update, and analyze submitted civilian harm reports. It has the ability to promote reports or discard to archive. The web page communicates with the chmr-dmz-dal(Data access layer) to retrive report data.

---

## Key Features ReportManagementPage
- Built using Material-UI for modern components.
- Ability to view Submitted Reports.
- Ability to update the status of Reports to promotable, notPromotable, discard.
- Optimized for different screen sizes (Desktop, Tabs, Phones).
- Ability to Download and analyze files linked to each report.
- Ability to sort by date and report status in ascending or descending order

## Directory Structure
- **chmr-dmz-maint/**
 -**src/**
    - 'assets/' - Contains static files that are used within the react code.
    - 'components/' - Holds all reusable UI building blocks.
    - 'styles/' - Holds style-component files that are used across components.
    - 'pages/ReportManagementPage.js' - The ReportMangmentPage webpage.
    - 'services/Api.js' - Api that communicates with the dmz-dal.
    -
 - 'public/'- Location for static assets.
 - 'Dockerfile' - The Dockerfile using nginx to serve the static files
 - 'Package.json' - Node.js dependencies and scripts
 -'.env' - Environment Variables
 - 'nginx.conf'- defines how the Nginx web server handles HTTP requests

 ## Future Improvements
 - Improve user experience by updating the UI
