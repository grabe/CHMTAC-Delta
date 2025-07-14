import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaComponent = ({ onVerify }) => {
  const handleCaptcha = (value) => {
    onVerify(!!value); // Notify parent component about the CAPTCHA status
  };

  return (
    <div className="mb-3">
      <ReCAPTCHA
        sitekey="Add-my-key-here" // Replace with your Google reCAPTCHA site key
        onChange={handleCaptcha}
      />
    </div>
  );
};

export default CaptchaComponent;
