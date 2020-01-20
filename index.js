let express = require("express");
let mongoose = require("mongoose");
let app = express();
app.use(express.json());
let port = process.env.PORT || 4600
let user = require("./routes/userroutes");
mongoose.connect("mongodb://localhost/monidb")
    .then(() => console.log("connected to db"))
    .catch(err => console.log(`something went wrong ${err.message}`));

app.use("/api", user);
app.listen(port, () => console.log(`port is working on ${port}`));