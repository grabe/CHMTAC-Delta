/**
 * Checks for Honeypot fields 
 */
export default (req, res, next) => {
  const honeypot1 = typeof req.body.honeypot1 === "string" ? req.body.honeypot1 : "";
  const honeypot2 = typeof req.body.honeypot2 === "string" ? req.body.honeypot2 : "";  
    if ((honeypot1 && honeypot1.trim() !== '') || (honeypot2 && honeypot2.trim() !== '')) {
      console.log("Honeypot triggered. Ignoring submission.");
      console.log("hpot1:", honeypot1, ", hpot2:", honeypot2);
      return res.status(200).json({ message: "Form submitted successfully!" }); // Simulate success
    }
  
    next();
  };
  