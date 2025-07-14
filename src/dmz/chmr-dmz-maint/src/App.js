import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportManagementPage from './pages/ReportManagmentPage.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportManagementPage />} />
      </Routes>
    </Router>
  );
};

export default App;
