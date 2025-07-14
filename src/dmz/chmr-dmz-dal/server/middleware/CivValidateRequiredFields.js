/**
 * Checks for required fields for Civilian Report
 */

export default (req, res, next) => {
    const requiredFields = [
      'publicUUID',
      'full_name',
      'phone_number',
      'email_address',
      'location',
      'start_datetime',
      'time_zone',
      'total_harm',
      'us_harm',
    ];
  
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
  
    next();
  };