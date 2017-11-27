const router=require("express").Router();
const articleControl=require("../controllers/articleControl");

// Create new article
router.post("/create",articleControl.create);

// Get all article
router.get("/all",articleControl.all);

// Delete article
router.delete("/delete/:id",articleControl.delete);

module.exports=router;
