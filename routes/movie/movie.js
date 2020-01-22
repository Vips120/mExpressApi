let express = require("express");
let router = express.Router();
let movie = require("../../modeldb/moviemodel/movie");
router.post("/movie", async (req, res) => { 
    let { error } = movie.movieValidation(req.body);
    if (error) { return res.send(error.details[0].message) };
    let genre = await movie.genreModel.findById(req.body.genreId);
    if (!genre) { return res.status(403).send({ message: "Invalid genre id" }) };
    let data = new movie.movieModel({
        name: req.body.name,
        actor: req.body.actor,
        price: req.body.price,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    let item = await data.save();
    res.send({ i: item });
});

module.exports = router;