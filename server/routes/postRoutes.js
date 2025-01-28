const express = require("express");
const router = express.Router();
const { auth } = require("../auth/userAuth");
const { addpost, getPosts, deletePost } = require("../controllers/postController");
router.post("/addPost", auth, addpost);
router.get("/getPosts", getPosts);
router.delete("/deletePost", auth, deletePost);
module.exports = router;
