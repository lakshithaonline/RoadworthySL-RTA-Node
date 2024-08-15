const axios = require('axios');

const pythonApiUrl = 'http://127.0.0.1:5000/predict';

async function getPrediction(data) {
    try {
        const response = await axios.post(pythonApiUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error calling the Python API:', error.message);
        throw error;
    }
}

module.exports = { getPrediction };
