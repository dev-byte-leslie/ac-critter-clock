import axios from 'axios';

export default async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Get the endpoint path and parameters from query string
        const { endpoint, fish } = req.query;

        // Get API keys from environment variables
        const API_KEY = process.env.NOOKIPEDIA_API_KEY;

        // Determine the full URL based on the requested endpoint
        let url;
        if (endpoint === 'all') {
            url = 'https://api.nookipedia.com/nh/fish';
        } else if (endpoint === 'single' && fish) {
            url = `https://api.nookipedia.com/nh/fish/${fish}`;
        } else {
            return res.status(400).json({ error: 'Invalid endpoint or missing parameters' });
        }

        // Make the API request with API key
        const response = await axios({
            url: url,
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY,
                'Accept-Version': '1.0.0'
            }
        });

        // Return the data to frontend
        res.status(200).json(response.data);
    } catch (error) {
        console.error('API proxy error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: error.message,
            details: error.response?.data || {}
        });
    }
};
