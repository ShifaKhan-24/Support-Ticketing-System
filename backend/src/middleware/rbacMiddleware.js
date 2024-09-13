const checkRole = (roles) => (req, res, next) => {
    // Assuming user info is in req.user (set after JWT authentication)
    if (roles.includes(req.user.role)) {
        return next();
    }
    res.status(403).json({ error: 'Forbidden' , message:"Access denied!"});
};

module.exports = checkRole;
