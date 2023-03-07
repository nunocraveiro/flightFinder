const express = require('express');
const allRoutes = require('./data.json');
const results = [];

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/api/flights', (req, res) => {
    res.send(allRoutes);
});

app.get('/api/flights/results', (req, res) => {
    res.send(results);
});

// Choosing two locations and getting all available flights between these locations:
app.post('/api/flights', (req, res) => {
    const location1 = req.body[0];
    const location2 = req.body[1];

    allRoutes.forEach(route => {
        if (route.departureDestination === location1 && route.arrivalDestination === location2 ||
            route.departureDestination === location2 && route.arrivalDestination === location1) results.push(route);
    })

    results.sort(a => {
        if (a.departureDestination === location1) {
            return -1;
        }
    });

    // res.setHeader('Location', '/api/flights/results');
    res
        .status(201)
        .send(results);
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`));