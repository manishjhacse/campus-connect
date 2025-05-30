const { Admin } = require("../model/adminModel");
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sendMail = require("../utills/sendEmail");
exports.adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide all the details",
      });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Email not registered!",
      });
    }
    const payload = {
      email: admin.email,
      _id: admin._id,
      name: admin.name,
    };
    if (await bcrypt.compare(password, admin.password)) {
      let token = await jwt.sign(payload, process.env.SECRETCODE, {});
      admin.password = undefined;
      const options = {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        admin: admin,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failure, Try Again",
      Error: err,
    });
  }
};

exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "approved" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    try {
      await sendMail({
        from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
        to: user.email,
        subject: "Your Campus Connect Account is Approved!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="background-color: #22c55e; color: white; padding: 15px; border-radius: 8px; text-align: center;">
              Approved - Your Account is Now Active!
            </h2>
            <p>Hi <strong>${user.firstName} ${user.lastName}</strong>,</p>
            <p>We're happy to inform you that your <strong>Campus Connect</strong> account has been successfully verified and approved.</p>
            <p>You now have full access to explore features, connect with peers, and stay updated on campus activities.</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="https://bpmce-community.vercel.app/home" style="text-decoration: none; background-color: #22c55e; color: white; padding: 10px 20px; border-radius: 5px;">
                Access Your Account
              </a>
            </p>
            <p>If you have any questions or need assistance, feel free to reach out. We're here to help!</p>
            <p>Best Regards, <br> The Campus Connect Team</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending welcome email:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "User approved successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error approving user",
      error: err.message,
    });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndDelete(userId);
    try {
      await sendMail({
        from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
        to: user.email,
        subject: "Your Account Application Status",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h1 style="background-color: #ef4444; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 0;">
              Account Application Rejected
            </h1>
            <p>Hi <strong>${user.firstName} ${user.lastName}</strong>,</p>
            <p>Thank you for your interest in <strong>Campus Connect</strong>. After reviewing your application, we regret to inform you that your account request has not been approved at this time.</p>
            <p>If you believe this decision was made in error or have any questions, please feel free to reach out to our support team.</p>
            <p>We appreciate your understanding.</p>
            <p>Best Regards, <br> The Campus Connect Team</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending welcome email:", mailError.message);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User rejected successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error rejecting user",
      error: err.message,
    });
  }
};
exports.suspendUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isSuspended = true;
    await user.save();

    // Send Suspension Email
    try {
      await sendMail({
        from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
        to: user.email,
        subject: "Your Campus Connect Account Has Been Suspended",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h1 style="background-color: #f59e0b; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 0;">
              Account Suspended
            </h1>
            <p>Hi <strong>${user.firstName} ${user.lastName}</strong>,</p>
            <p>We wanted to inform you that your account on <strong>Campus Connect</strong> has been temporarily suspended due to certain policy violations or concerns that need review.</p>
            <p>If you believe this suspension was made in error or have any questions, please reach out to our support team immediately at <a href="mailto:manishjhaproject@gmail.com">Gmail</a>.</p>
            <p>Your access has been restricted until further notice. We appreciate your cooperation in resolving this matter.</p>
            <p>Best Regards,<br>The Campus Connect Team</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending suspension email:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "User suspended successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error suspending user",
      error: err.message,
    });
  }
};

exports.removeSuspendUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isSuspended = false;
    await user.save();

    // Send Reinstatement Email
    try {
      await sendMail({
        from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
        to: user.email,
        subject: "Your Account Has Been Reinstated",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h1 style="background-color: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 0;">
              Account Reinstated
            </h1>
            <p>Hi <strong>${user.firstName} ${user.lastName}</strong>,</p>
            <p>We're pleased to inform you that your account on <strong>Campus Connect</strong> has been reinstated and is now active.</p>
            <p>You can now log in and continue using the platform as usual. If you experience any issues or have further questions, feel free to contact our support team at <a href="mailto:manishjhaproject@gmail.com">Gmail</a>.</p>
            <p>Welcome back!</p>
            <p>Best Regards,<br>The Campus Connect Team</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending reinstatement email:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "User reinstated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error reinstating user",
      error: err.message,
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 15, registration_no, status } = req.query;

    const parsedPage = Math.max(1, parseInt(page) || 1);
    const parsedLimit = Math.max(1, parseInt(limit) || 15);

    let query = {};

    if (registration_no) {
      query.registration_no = { $regex: registration_no, $options: "i" };
    }

    // Add status filter if it's valid
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query.status = status;
    }

    const [
      users,
      totalCount,
      numberOfUsers,
      numberOfPendingUser,
      numberOfApprovedUser,
      numberOfRejectedUser,
    ] = await Promise.all([
      User.find(query)
        .select("-password")
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit)
        .exec(),
      User.countDocuments(query),
      User.countDocuments({}),
      User.countDocuments({ status: "pending" }),
      User.countDocuments({ status: "approved" }),
      User.countDocuments({ isSuspended: true }),
    ]);

    const stats = {
      numberOfUsers,
      numberOfPendingUser,
      numberOfApprovedUser,
      numberOfRejectedUser,
    };

    res.json({
      page: parsedPage,
      limit: parsedLimit,
      totalCount,
      totalPages: Math.ceil(totalCount / parsedLimit),
      users,
      stats,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
