let express = require("express");
let router = express.Router();
let Genre = require("../../modeldb/moviemodel/movie");

router.post("/genre", async (req, res) => {
    let { error } = Genre.GenreValidation(req.body);
    if (error) { return res.send(error.details[0].message) };
    let genre = new Genre.genreModel({
        name: req.body.name
    });
    let data = await genre.save();
    res.send(data);
});

module.exports = router;