const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true },
    booking_date: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Ticket', TicketSchema);