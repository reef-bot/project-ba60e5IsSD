// File: src/utils/fetchData.js

const fetch = require('node-fetch');
const { API_KEY } = require('../config/auth');

const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
};

module.exports = fetchData;