let express = require("express");
let mongoose = require("mongoose");
let app = express();
let fawn = require("fawn");
fawn.init(mongoose);
app.use(express.json());
let port = process.env.PORT || 4600
let user = require("./routes/userroutes");
let auth = require("./routes/auth/auth");
let genre = require("./routes/movie/genre");
let movie = require("./routes/movie/movie");
let stockmovie = require("./routes/transaction/movie");
let pagination = require("./routes/pagination");
let mailer = require("./routes/mailer");
let forgotpassword = require("./routes/forgotpassword");
let imageupload = require("./routes/fileupload");
let config = require("config");
if (!config.get("moniapi")) {
    console.log("ACCESS DENIED! NO TOKEN FOUND IN ENV");
    process.exit(1);
}
mongoose.connect("mongodb://localhost/monidb", { useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch(err => console.log(`something went wrong ${err.message}`));
app.use("/uploads", express.static("uploads"));
app.use("/api", user);
app.use("/api", auth);
app.use("/api", genre);
app.use("/api", movie);
app.use("/api/moviestock", stockmovie);
app.use("/api/pagination", pagination);
app.use("/api/mail", mailer);
app.use("/api", forgotpassword);
app.use("/api", imageupload);
app.listen(port, () => console.log(`port is working on ${port}`));