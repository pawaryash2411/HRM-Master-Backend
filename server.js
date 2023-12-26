const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://geolocation-db.com/json');
        // Assuming you want to send the received data as the response
        res.json(response.data);
    } catch (error) {
        // Handle any errors that occurred during the fetch
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
