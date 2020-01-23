let jwt = require("jsonwebtoken");
let config = require("config");
function Auth(req, res, next) {
    let token = req.header("x-auth-token");
    if (!token) { return res.status(402).send("ACCESS DENIED! invalid token") };
    try {
        let dcoded = jwt.verify(token, config.get("moniapi"));
        req.user = dcoded;
        next();
    }
    catch (ex) {
        return res.status(500).send({ message: "INTERNAL SERVER ERROR!" });
    }
  
};

module.exports = Auth;
