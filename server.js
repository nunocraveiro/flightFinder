const express = require('express');
const allRoutes = require('./data.json');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
let results = [];

app.get('/api/flights', (req, res) => {
    res.send(allRoutes);
});

app.get('/api/flights/results', (req, res) => {
    res.send(results);
});

// Choosing two locations and getting all available flights between these locations
// In the request body, needs to receive an array with two locations as strings

app.post('/api/flights-by-location', (req, res) => {
    results = [];
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
    
    res
        .status(201)
        .send(results);
})

// Getting flights depending on given date
// In the request body, needs to receive an array with the date as a string in the format "yyyy-mm-dd"

app.post('/api/flights-by-date', (req, res) => {
    results = [];
    const date = req.body[0];

    allRoutes.forEach(route => {
        const filteredItineraries = route.itineraries.filter(itinerary => itinerary.departureAt.includes(date));
        if (filteredItineraries.length !== 0) results.push({
            route_id: route.route_id,
            departureDestination: route.departureDestination,
            arrivalDestination: route.arrivalDestination,
            itineraries: filteredItineraries
        })
    })
    res.status(201).send(results);
})

// Book a flight
// In the request body, needs to receive an object like the following: 
/* {
    fromLocation:"Oslo",
    toLocation:"Stockholm",
    date:"2023-03-29",
    time:"11:00:00",
    quantity:1
} */

app.post('/api/flights', (req, res) => {
    results = [];
    const fromLocation = req.body.fromLocation;
    const toLocation = req.body.toLocation;
    const date = req.body.date;
    const time = req.body.time;
    const quantity = req.body.quantity;

    allRoutes.forEach(route => {
        if (route.departureDestination === fromLocation && route.arrivalDestination === toLocation) {
            const flightToBook = route.itineraries[route.itineraries.findIndex(itinerary => itinerary.departureAt === `${date}T${time}.000Z`)];
            if (!flightToBook) {
                return res.status(401).send('Sorry, there are no flights for the desired times.');
            }
            if (quantity > 1 && flightToBook.availableSeats - quantity < 0) {
                return res.status(401).send('Sorry, there are not enough seats available.');
            }
            if (flightToBook.availableSeats === 0) {
                return res.status(401).send('Sorry, the flight is full.');
            }
            flightToBook.availableSeats -= quantity;
            return results.push(flightToBook);
        }

    })

    // Getting layovers, should not be in the booking endpoint
    if (results.length === 0) {
        const departureArray = allRoutes.filter(route => route.departureDestination === fromLocation);
        const arrivalArray = allRoutes.filter(route => route.arrivalDestination === toLocation);
        const resultArray = arrivalArray.filter(arrRoute => departureArray.some(depRoute => arrRoute.departureDestination === depRoute.arrivalDestination));
        results = resultArray.concat(departureArray.filter(depRoute => arrivalArray.some(arrRoute => depRoute.arrivalDestination === arrRoute.departureDestination)));
        if (results.length === 0) {
            return res.status(401).send('Sorry, there are no flights for these locations.');
        }
        results.sort(a => {
            if (a.departureDestination === fromLocation) {
                return -1;
            }
        });
    }
    // Returns the booked flight and updates the available seats. Regarding layovers, just returns the search results.
    return res.status(201).send(results);
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`));