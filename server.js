const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a booking schema and model
const bookingSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    travelDate: String,
    email: String,
    totalTravelers: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Define the route to handle booking submissions
app.post('/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send({ message: 'Booking saved successfully', booking });
    } catch (error) {
        res.status(500).send({ message: 'Error saving booking', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
