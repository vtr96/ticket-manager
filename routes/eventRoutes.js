const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    const events = await Event.find({ available_tickets: { $gt: 0 } });
    res.render('events', { events, user: req.session.user });
});

router.get('/new', isAuthenticated, isAdmin, (req, res) => {
    res.render('new-event');
});

router.post('/new', isAuthenticated, isAdmin, async (req, res) => {
    const { title, total_tickets, price } = req.body;
    const newEvent = new Event({
        title,
        total_tickets,
        available_tickets: total_tickets,
        price
    });
    await newEvent.save();
    res.redirect('/events');
});

router.get('/edit/:eventId', isAuthenticated, isAdmin, async (req, res) => {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.redirect('/events');

    res.render('edit-event', { event });
});

router.post('/edit/:eventId', isAuthenticated, isAdmin, async (req, res) => {
    const { price, total_tickets } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.redirect('/events');

    event.price = price;

    const addedTickets = total_tickets - event.total_tickets;
    if (addedTickets > 0) {
        event.available_tickets += addedTickets;
    }
    event.total_tickets = total_tickets;

    await event.save();
    res.redirect('/events');
});

module.exports = router;