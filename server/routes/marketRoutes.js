const express=require("express");
const { addItem, getItems } = require("../controllers/marketPlaceController");
const { auth } = require("../auth/userAuth");
const router=express.Router();
router.post("/addItem",auth,addItem)
router.get("/getItems",getItems)
module.exports=router;
