let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/monidb", { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch(err => console.log(`something went wrong ${err.message}`));
let userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    Email: { type: String, required: true }
});

let movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // userId:{type: mongoose.Schema.Types.ObjectId, ref:"customer"}
    // actor: { type: String },
    // stocks: { type: Number }
    userId: [userSchema]
});

// let usermovieSchema = new mongoose.Schema({
//     userid: { type: userSchema },
//     movieId: { type: movieSchema }
// });

let Users = mongoose.model("customer", userSchema);
let movies = mongoose.model("movies", movieSchema);
// let usermovie = mongoose.model("usermovies", usermovieSchema);

async function CreateUser(fname, lname, email) {
    let data = new Users({
        firstname: fname,
        lastname: lname,
        Email: email
    });
    let item = await data.save();
    console.log(item);
}
// CreateUser("john", "doe", "john@gmail.com");

async function createMovie(name, id) {
    let movie = new movies({
        name: name,
        userId: id
    });
    let m = await movie.save();
    console.log(m);

};

// createMovie("BATMAN", "5e26ad51bdd02f11e8bb243c");
createMovie("SUPERMEN", [new Users({
    firstname: "kim",
    lastname: "Doe",
Email:"kim@gmail.com"
}),
new Users({
    firstname: "Rahul",
    lastname: "roy",
Email:"r@gmail.com"
})

])

async function FetchAllMovie() {
    let item = await movies
        .find()
         .populate("userId")
        ;
    console.log(item);
}

// FetchAllMovie();