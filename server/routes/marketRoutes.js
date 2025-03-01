const express=require("express");
const { addItem, getItems, deleteProduct } = require("../controllers/marketPlaceController");
const { auth } = require("../auth/userAuth");
const router=express.Router();
router.post("/addItem",auth,addItem)
router.get("/getItems",getItems)
router.delete("/deleteProduct", auth,deleteProduct );
module.exports=router;
