# CHMTAC (Intake Web Page) Charlie

The Intake Web Page is a React-based public web form for submitting civilian Harm Reports. It can be configured to either submitting a civilian version or the dod version of a report. This intake web page sends JSON form data and the uploaded files attached to each report to the chmr-dmz-dal (Data Access Layer).

## Key Features-Intake Web Page
- Built using Material-UI for modern components.
- Ability to submit either a Civilian or DoD Report form.
- Ability to attach 5 supporting documents, including video files up to 5 gb.
- Optimized for different screen sizes (Desktop, Tabs, Phones).
- Client side validation for all the required fields.
- Built in Honeypot fields to mitigate bot attacks.

## Directory Structure
- **chmr-intake-web/**
 -**src/**
    - 'assets/' - Contains static files that are used within the react code.
    - 'components/' - Holds all reusable UI building blocks.
      -'/CaptchaComponent' - A captcha for added security against attacks.
      -'/CivilianContactInfo - Contact Info for the Civilian Intake Form.
      -'/DodContactInfo - Contact Info for the Dod Intake Form.
      -'/FileUploadComponent' - Allows users to Upload 5 Files up to 5 GB each.
      -'/Header.js' - Header for the ReportForm and Submission Page.
      -'IntakeFormComponent' - Validation for all the required Fields and HoneyPot Checks
      -'MenuBar.js'   
    - 'styles/' - Holds style-component files that are used across components.
    - 'pages/
      - /ReportForm.js' - The Report form the User Fills out and submits.
      -/SubmissionPage.js - Displays the Public UUID and the Info the user submitted.
    - 'services
      -/Api.js' - communicates with the dmz-dal and sends the report data and the files to the dal.
    -
 - 'public/'- Location for static assets.
 - 'Dockerfile' - The Dockerfile using nginx to serve the static files
 - 'Package.json' - Node.js dependencies and scripts
 -'.env' - Environment Variables
 - 'nginx.conf'- defines how the Nginx web server handles HTTP requests

 ## Future Improvements
 - Improve user experience by updating the UI