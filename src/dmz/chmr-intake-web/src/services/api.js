import axios from 'axios';

// Use relative paths for API calls
const API_BASE_URL = '/report';

//Submits the report to the backend API
export const submitReport = async (data) => {
  try {
    const contactType = process.env.CHIR_CONTACT_TYPE || 'DOD';
    const endpoint = `${API_BASE_URL}?type=${encodeURIComponent(contactType)}`;

    // Debugging: Log the FormData object
    console.log('FormData being submitted:');
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await axios.post(endpoint, data, {
      headers: { 'Content-Type': 'multipart/form-data' }, // Optional: Axios sets this automatically
    });

    return response.data;
  } catch (error) {
    // Log detailed error information to the console
    console.error('Error submitting the report:');
    console.error('Status:', error.response?.status || 'No status available');
    console.error('Data:', error.response?.data || 'No response data available');
    console.error('Message:', error.message);
    throw error;
  }
};

export default axios;
