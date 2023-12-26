const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');
const apiKey = 'AIzaSyBpcBi67uEbAIQTdShuxektx1E_v38CTHI';
const address = 'tajmahal';
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
)}&key=${apiKey}`;

const getlocation = (req, res) => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                console.log('Latitude:', location.lat);
                console.log('Longitude:', location.lng);

                const latitude = location.lat;
                const longitude = location.lng;

                axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                    .then(response => {
                        const locationData = response.data;
                        console.log(locationData);
                        // Process locationData here
                        res.send(locationData); // Send location data as response to the client
                    })
                    .catch(error => {
                        console.log('Error fetching location:', error);
                        res.status(500).send('Error fetching location');
                    });
            } else {
                console.log('Error:', data.status);
                res.status(500).send('Error fetching address');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        });


}

module.exports = { getlocation }