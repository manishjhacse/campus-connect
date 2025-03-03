const express=require("express");
const { auth } = require("../auth/userAuth");
const { addJob, getJobs, deleteJob } = require("../controllers/jobController");
const router=express.Router();
router.post("/addjob",auth,addJob)
router.get("/getjobs",getJobs)
router.delete("/deletejobs", auth,deleteJob );
module.exports=router;
