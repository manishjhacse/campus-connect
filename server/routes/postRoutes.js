const express = require("express");
const router = express.Router();
const { auth } = require("../auth/userAuth");
const { addpost,getPosts } = require("../controllers/postController");
router.post("/addPost", auth,addpost);
router.get("/getPosts", getPosts);
module.exports = router;
