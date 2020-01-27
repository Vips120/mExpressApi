let express = require("express");
let router = express.Router();
let multer = require("multer");
let image = require("../modeldb/usermodel");
let port = "http://localhost:4600";
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
router.post("/fileupload", upload.single('image'), async (req, res) => {
    let fileupload = new image.imageModel({
        image: port + "/uploads/" + req.file.filename
    });
    let data = await fileupload.save();
    res.send(data);
});

module.exports = router;