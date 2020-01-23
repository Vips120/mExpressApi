function Admin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(500).send({ message: "internal server error" });
    }
    next();
};
module.exports = Admin;