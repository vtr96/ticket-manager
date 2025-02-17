require('dotenv').config();
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('./config/database');
const session = require('express-session');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/bookingRoutes'));
app.use('/events', require('./routes/eventRoutes'));
app.use('/booking', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));