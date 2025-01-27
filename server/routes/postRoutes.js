const express = require("express");
const router = express.Router();
const { auth } = require("../auth/userAuth");
const { addpost } = require("../controllers/postController");
router.post("/addPost", auth, addpost);
module.exports = router;
