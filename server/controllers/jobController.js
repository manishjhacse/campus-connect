const { Job } = require("../model/jobModel");

exports.addJob = async (req, res) => {
  try {
    const { title, company, location, salary, job_type, description, qualifications, applyLink, skills } = req.body;
    
    // Check for required fields
    if (!title || !company || !location || !job_type || !description || !applyLink) {
      return res.status(400).json({
        success: false,
        message: "Missing required job details",
      });
    }

    const userId = req.user._id;
    const jobDetails = {
      title,
      company,
      location,
      salary,
      job_type,
      description,
      qualifications,
      applyLink,
      skills: skills ? skills.split(",").map(skill => skill.trim()) : [],
      userId,
    };

    // Create job entry
    const job = await Job.create(jobDetails);
    const createdJob = await job.populate("userId", "firstName lastName");

    return res.status(201).json({
      success: true,
      message: "Job listing added",
      job: createdJob,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No job listings available",
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.query.jobId;
    const userId = req.user._id;
    
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if the user is the job poster
    if (String(job.userId) !== String(userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Delete job image from Cloudinary if exists
    if (job.image) {
      await deleteFileFromCloudinary(job.image);
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job listing deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
  }
};


