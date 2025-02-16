const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    total_tickets: { type: Number, required: true },
    available_tickets: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Event', EventSchema);