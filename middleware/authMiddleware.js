module.exports = {
    isAuthenticated: (req, res, next) => {
        if (!req.session.user) return res.redirect('/login');
        next();
    },
    isAdmin: (req, res, next) => {
        if (!req.session.user || !req.session.user.isAdmin) return res.redirect('/');
        next();
    }
};