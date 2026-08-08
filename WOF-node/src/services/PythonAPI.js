const axios = require('axios');

const pythonApiUrl = process.env.PYTHON_API_URL || 'http://127.0.0.1:5000/predict';

async function getPrediction(data) {
    try {
        const response = await axios.post(pythonApiUrl, data, {timeout: 10000});
        return response.data;
    } catch (error) {
        console.error('Error calling the Python API:', error.message);
        throw error;
    }
}

module.exports = { getPrediction };
