let express = require("express");
let router = express.Router();
let task = require("../modeldb/moviemodel/movie");
router.get("/:id", async (req, res) => {
    let perpage = 5;
    let currentpage = req.params.id || 1;
    let data = await task
        .taskModel
        .find()
        .skip((perpage * currentpage) - perpage)
        .limit(perpage);
    let pageCount = await task.taskModel.count();
    let totalpages = Math.ceil(pageCount / perpage);
    res.send({
        perpage: perpage,
        data: data,
        pageCount: pageCount,
        totalpages: totalpages
    });
});

module.exports = router;