let express = require("express");
let router = express.Router();
let fawn = require("fawn");
let movie = require("../../modeldb/transcationmodel/movie");
let user = require("../../modeldb/transcationmodel/user");
let usermovie = require("../../modeldb/transcationmodel/usermovie");

//user
router.post("/user", async (req, res) => {
    let { error } = user.UserValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let data = new user.userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailid: req.body.emailid
    });
    let item = await data.save();
    res.send(item);
});
//movie

router.post("/movie", async (req, res) => {
    let { error } = movie.MovieValidation(req.body);
    if (error) { return res.send(error.details[0].message) };
    let data = new movie.movieModel({
        name: req.body.name,
        actor: req.body.actor,
        price: req.body.price,
        stocks: req.body.stocks
    });
    let item = await data.save();
    res.send(item);
});
//usermovie

router.post("/usermovie", async (req, res) => {
    try {
        let { error } = usermovie.UsermovieValidation(req.body);
        if (error) { return res.send(error.details[0].message) };
        let m = await movie.movieModel.findById(req.body.mId);
        if (!m) { return res.status(403).send({ message: "Invalid movie id" }) };
        console.log(m);
        let u = await user.userModel.findById(req.body.uId);
        if (!u) { return res.status(403).send({ message: "Invalid user id" }) };
        console.log(u);
        let data = new usermovie.usermoviemodel({
            userId: {
                firstname: u.firstname,
                lastname: u.lastname,
                emailid: u.emailid
            },
            movieId: {
                name: m.name,
                actor: m.actor,
                price: m.price,
                stocks: m.stocks
            }
        });
      
        fawn
            .Task()
            .save("usermovies", data)
            .update("moviestocks", { _id: m._id }, {
                $inc: {
                  stocks: -1  
                }
            }).run();
            
         // let item = await data.save();
        // movieId.stocks--;
        // await movieId.save();
        res.send({message: "Thank you"});        
    }
    catch(ex) {
        res.send(ex.message);
    }

});

module.exports = router;