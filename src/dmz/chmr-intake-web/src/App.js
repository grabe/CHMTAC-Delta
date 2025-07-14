import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportForm from './pages/ReportForm.js';
import SubmissionPage from './pages/SubmissionPage.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route path="/SubmissionPage" element={<SubmissionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
