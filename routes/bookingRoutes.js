const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const { isAuthenticated } = require('../middleware/authMiddleware');


router.post('/book/:eventId', isAuthenticated, async (req, res) => {
    const { eventId } = req.params;
    const { quantity } = req.body;
    const userId = req.session.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.redirect('/events');

    if (event.available_tickets < quantity) {
        return res.send('O número de ingressos disponíveis é menor do que a quantidade desejada.');
    }

    const booking = new Ticket({ user_id: userId, event_id: eventId, quantity });
    await booking.save();

    event.available_tickets -= quantity;
    await event.save();

    await res.redirect('/my-tickets');
});

router.get('/my-tickets', isAuthenticated, async (req, res) => {
    const tickets = await Ticket.find({ user_id: req.session.user._id }).populate('event_id');
    res.render('my-tickets', { tickets });
});

module.exports = router;