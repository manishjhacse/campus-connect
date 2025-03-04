const { OTP, User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendMail = require("../utills/sendEmail");
const MailChecker = require("mailchecker");
const {
  uploadImageToCloudinary,
  deleteFileFromCloudinary,
} = require("../utills/cloudinary");
///Singup OTP
exports.signupOTP = async (req, res) => {
  let savedOtp;
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "outlook.in",
      "microsoft.com",
      "hotmail.com",
    ];

    if (!email) {
      return res.status(400).json({
        message: "Please provide an email",
      });
    }

    if (!MailChecker.isValid(email)) {
      return res.status(400).json({
        message: "Disposable mail is not allowed",
      });
    }

    const emailDomain = email.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
      return res.status(400).json({
        message: "This Email domain is not allowed",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already Registered",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000);

    const otpRecord = await OTP.findOne({ email });
    if (otpRecord) {
      if (otpRecord.expiresAt - 8 * 60 * 1000 > Date.now()) {
        const remainingTimeInMillis = otpRecord.expiresAt - Date.now();
        const remainingMinutes = Math.floor(remainingTimeInMillis / 60000);
        const remainingSeconds = Math.floor(
          (remainingTimeInMillis % 60000) / 1000
        );
        return res.json({
          success: true,
          message: `OTP sent. Check Spam or try again in ${Math.floor(
            (remainingTimeInMillis - 8 * 60 * 1000) / 1000
          )} sec.`,
        });
        
      }

      savedOtp = await OTP.findOneAndUpdate(
        { email },
        { code, expiresAt: Date.now() + 10 * 60 * 1000 },
        { new: true }
      );
    } else {
      savedOtp = await OTP.create({
        email,
        code,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });
    }

    // Send OTP email
    const result = await sendMail({
      from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
      to: email,
      subject: `Campus Connect Email Verification for ${email}. Your OTP is ${code}`,
      text: `Your Email OTP code: ${code}\nIt is valid for 10 minutes only. Please use this code to verify your email.`,
      html: `
    <html lang="en">
    <head>
    <style>
      body {
          font-family: 'Poppins', Arial, sans-serif;
          background-color: #f3f4f6; /* Light Gray */
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          color: #1f2937; /* Dark Gray */
      }
      .email-container {
          max-width: 650px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #e5e7eb; /* Light Gray Border */
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1.2s ease-in-out;
      }
      @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
      }
      .header {
          text-align: center;
          background: linear-gradient(135deg, #ef4444, #dc2626); /* Gradient Red */
          color: #ffffff;
          padding: 40px 20px;
          border-radius: 12px 12px 0 0;
      }
      .header h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 1px;
      }
      .header p {
          margin: 10px 0 0;
          font-size: 16px;
          font-weight: 300;
      }
      .content {
          padding: 30px;
          font-size: 16px;
          line-height: 1.8;
          color: #374151; /* Gray-700 */
      }
      .content h2 {
          color: #ef4444; /* Red */
          font-size: 22px;
          margin-bottom: 15px;
          border-bottom: 2px solid #f87171; /* Light Red */
          display: inline-block;
          padding-bottom: 5px;
      }
      .otp {
          text-align: center;
          margin: 30px auto;
          padding: 15px 0;
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(135deg, #ef4444, #b91c1c); /* Gradient Red */
          border-radius: 8px;
          letter-spacing: 3px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 250px;
          animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
      }
      .divider {
          border-top: 2px dashed #e5e7eb; /* Dashed Separator */
          margin: 30px 0;
      }
      .footer {
          text-align: center;
          color: #6b7280; /* Gray-500 */
          padding: 20px;
          font-size: 14px;
          background-color: #f9fafb; /* Extra Light Gray */
          border-radius: 0 0 12px 12px;
          border-top: 1px solid #e5e7eb;
      }
      .footer a {
          color: #ef4444;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
      }
      .footer a:hover {
          color: #b91c1c; /* Darker Red */
          text-decoration: underline;
      }
    </style>
    </head>
    <body>
    <div class="email-container">
      <div class="header">
          <h1>Welcome to Campus Connect</h1>
          <p>Your gateway to stay connected with campus activities</p>
      </div>
      <div class="content">
          <h2>Email Verification</h2>
          <p>Hello <strong>${email}</strong>,</p>
          <p>
              We’re excited to have you on board! To get started, please verify your email address using the OTP provided below:
          </p>
          <div class="otp">${code}</div>
          <p>
              This OTP is valid for <strong>10 minutes</strong>. Please enter it on the verification page to confirm your email.
          </p>
          <div class="divider"></div>
          <p>
              If you didn’t request this, don’t worry—you can safely ignore this email. Need assistance? We’re here to help!
          </p>
      </div>
      <div class="footer">
          <p>&copy; 2025 Campus Connect. All rights reserved.</p>
          <p><a href="mailto:manishjhaproject@gmail.com">Contact Support</a></p>
      </div>
    </div>
    </body>
    </html>
          `,
    });

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "OTP sent successfully.",
        data: result,
      });
    } else {
      if (savedOtp) {
        await OTP.deleteOne({ _id: savedOtp._id });
      }
      return res.status(501).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
        error: result,
      });
    }
  } catch (err) {
    if (savedOtp) {
      await OTP.deleteOne({ _id: savedOtp._id });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
      error: err,
    });
  }
};

// Reset password OTP
exports.resetOTP = async (req, res) => {
  let savedOtp;
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    if (!email) {
      return res.status(400).json({
        message: "Please provide an email",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email Not Registered",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000);

    const otpRecord = await OTP.findOne({ email });
    if (otpRecord) {
      if (otpRecord.expiresAt - 8 * 60 * 1000 > Date.now()) {
        const remainingTimeInMillis = otpRecord.expiresAt - Date.now();
        return res.json({
          success: true,
          message: `OTP already sent. Request a new one after ${Math.floor(
            (remainingTimeInMillis - 8 * 60 * 1000) / 1000
          )} seconds.`,
        });
      }

      savedOtp = await OTP.findOneAndUpdate(
        { email },
        { code, expiresAt: Date.now() + 10 * 60 * 1000 },
        { new: true }
      );
    } else {
      savedOtp = await OTP.create({
        email,
        code,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });
    }

    // Send OTP email
    const result = await sendMail({
      from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
      to: email,
      subject: `Campus Connect Password Change for ${email}. Your OTP is ${code}`,
      text: `Your OTP code: ${code}\nIt is valid for 10 minutes only. Please use this code to change your password.`,
      html: `
      <html lang="en">
      <head>
        <style>
          body {
              font-family: 'Poppins', Arial, sans-serif;
              background-color: #f3f4f6; /* Light Gray */
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
              color: #1f2937; /* Dark Gray */
          }
          .email-container {
              max-width: 650px;
              margin: 40px auto;
              background-color: #ffffff;
              padding: 25px;
              border-radius: 12px;
              border: 1px solid #e5e7eb; /* Light Gray Border */
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              animation: fadeIn 1.2s ease-in-out;
          }
          @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .header {
              text-align: center;
              background: linear-gradient(135deg, #ef4444, #b91c1c); /* Gradient Red */
              color: #ffffff;
              padding: 40px 20px;
              border-radius: 12px 12px 0 0;
          }
          .header h1 {
              margin: 0;
              font-size: 30px;
              font-weight: 700;
              letter-spacing: 1px;
          }
          .header p {
              margin: 10px 0 0;
              font-size: 16px;
              font-weight: 300;
          }
          .content {
              padding: 30px;
              font-size: 16px;
              line-height: 1.8;
              color: #374151; /* Gray-700 */
          }
          .content h2 {
              color: #ef4444; /* Red */
              font-size: 22px;
              margin-bottom: 15px;
              border-bottom: 2px solid #fca5a5; /* Light Red */
              display: inline-block;
              padding-bottom: 5px;
          }
          .otp {
              text-align: center;
              margin: 30px auto;
              padding: 15px 0;
              font-size: 28px;
              font-weight: bold;
              color: #ffffff;
              background: linear-gradient(135deg, #ef4444, #b91c1c); /* Gradient Red */
              border-radius: 8px;
              letter-spacing: 3px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              max-width: 250px;
              animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
          }
          .divider {
              border-top: 2px dashed #e5e7eb; /* Dashed Separator */
              margin: 30px 0;
          }
          .footer {
              text-align: center;
              color: #6b7280; /* Gray-500 */
              padding: 20px;
              font-size: 14px;
              background-color: #f9fafb; /* Extra Light Gray */
              border-radius: 0 0 12px 12px;
              border-top: 1px solid #e5e7eb;
          }
          .footer a {
              color: #ef4444;
              text-decoration: none;
              font-weight: 600;
              transition: color 0.3s ease;
          }
          .footer a:hover {
              color: #b91c1c; /* Darker Red */
              text-decoration: underline;
          }
        </style>
      </head>
      <body>
      <div class="email-container">
        <div class="header">
            <h1>Campus Connect</h1>
            <p>Password Change Request</p>
        </div>
        <div class="content">
            <h2>OTP for Password Change</h2>
            <p>Hello <strong>${email}</strong>,</p>
            <p>
                You requested to change your password. Use the OTP below to complete the process:
            </p>
            <div class="otp">${code}</div>
            <p>
                This OTP is valid for <strong>10 minutes</strong>. Please use it promptly to ensure your account security.
            </p>
            <div class="divider"></div>
            <p>
                If you did not request this, please contact support immediately.
            </p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Campus Connect. All rights reserved.</p>
            <p><a href="mailto:manishjhaproject@gmail.com">Contact Support</a></p>
        </div>
      </div>
      </body>
      </html>
      `,
    });

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "OTP sent successfully.",
        data: result,
      });
    } else {
      if (savedOtp) {
        await OTP.deleteOne({ _id: savedOtp._id });
      }
      return res.status(501).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
        error: result,
      });
    }
  } catch (err) {
    if (savedOtp) {
      await OTP.deleteOne({ _id: savedOtp._id });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
      error: err,
    });
  }
};

//signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, otp, registration_no } =
      req.body;

    // Check if the registration number is already registered
    const existingUser = await User.findOne({ registration_no });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This Registration Number is already registered.",
      });
    }

    // Find the OTP associated with the email
    const sentOtp = await OTP.findOne({ email });
    if (!sentOtp) {
      return res.status(400).json({
        success: false,
        message: "First Request an OTP",
      });
    }

    // Validate OTP
    if (Number(sentOtp.code) !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    if (sentOtp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Request a new one.",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while hashing the password.",
        error: err.message,
      });
    }

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      registration_no,
    });

    // Send a welcome email
    try {
      await sendMail({
        from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
        to: email,
        subject: "Your Account is Under Verification!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; padding: 15px; border-radius: 8px; text-align: center;">
              Welcome to Campus Connect
            </h2>
            <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
            <p>Thank you for creating your account on <strong>Campus Connect</strong>! Our team is currently reviewing your registration.</p>
            <p>Once approved, you'll be able to access all features and engage with the community.</p>
            <p style="color: #ff4500; font-weight: bold;">Please be patient as this process may take some time.</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="https://bpmce-community.vercel.app/" style="text-decoration: none; background-color: #ef4444; color: white; padding: 10px 20px; border-radius: 5px;">
                Visit Campus Connect
              </a>
            </p>
            <p>We appreciate your patience and look forward to welcoming you soon.</p>
            <p>Best Regards, <br> The Campus Connect Team</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending welcome email:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide all the details",
      });
    }
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email not registered!",
      });
    }
    const payload = {
      email: user.email,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = await jwt.sign(payload, process.env.SECRETCODE, {});
      user.password = undefined;
      const options = {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
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

//logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong",
      err,
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email not Registered!",
      });
    }

    // Find the OTP associated with the email
    const sentOtp = await OTP.findOne({ email });
    if (!sentOtp) {
      return res.status(400).json({
        success: false,
        message: "First Request an OTP",
      });
    }

    // Validate OTP
    if (Number(sentOtp.code) !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    if (sentOtp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Request a new one.",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server Error",
        error: err.message,
      });
    }

    // Create a new user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    // Send a confirmation email
    try {
      await sendMail({
        from: "BPMCE Campus Connect <manishjhaproject@gmail.com>",
        to: email,
        subject: "Your Password Has Been Successfully Changed",
        html: `
        <html lang="en">
        <head>
          <style>
            body {
              font-family: 'Poppins', Arial, sans-serif;
              background-color: #f3f4f6; /* Light Gray */
              margin: 0;
              padding: 0;
              color: #1f2937; /* Dark Gray */
            }
            .email-container {
              max-width: 650px;
              margin: 40px auto;
              background-color: #ffffff;
              padding: 25px;
              border-radius: 12px;
              border: 1px solid #e5e7eb; /* Light Gray Border */
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              animation: fadeIn 1.2s ease-in-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .header {
              text-align: center;
              background: linear-gradient(135deg, #ef4444, #b91c1c); /* Gradient Red */
              color: #ffffff;
              padding: 30px 20px;
              border-radius: 12px 12px 0 0;
            }
            .header h2 {
              margin: 0;
              font-size: 26px;
              font-weight: 700;
              letter-spacing: 1px;
            }
            .content {
              padding: 30px;
              font-size: 16px;
              line-height: 1.8;
              color: #374151; /* Gray-700 */
            }
            .content p {
              margin-bottom: 20px;
            }
            .content a {
              color: #ffffff;
              background: linear-gradient(135deg, #ef4444, #dc2626); /* Gradient Red */
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              transition: background-color 0.3s ease;
              display: inline-block;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .content a:hover {
              background: linear-gradient(135deg, #b91c1c, #991b1b); /* Darker Red */
            }
            .footer {
              margin-top: 20px;
              border-top: 2px dashed #e5e7eb; /* Dashed Separator */
              padding-top: 20px;
              font-size: 14px;
              text-align: center;
              color: #6b7280; /* Gray-500 */
            }
            .footer a {
              color: #ef4444; /* Red-500 */
              text-decoration: none;
              font-weight: 600;
              transition: color 0.3s ease;
            }
            .footer a:hover {
              color: #b91c1c; /* Darker Red */
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>Password Changed Successfully</h2>
            </div>
            <div class="content">
              <p>Hi <strong>${updatedUser.firstName} ${updatedUser.lastName}</strong>,</p>
              <p>
                This is to confirm that your password has been successfully updated for your <strong>Campus Connect</strong> account.
              </p>
              <p>
                If you did not initiate this change, please contact our support team immediately to ensure the security of your account.
              </p>
              <p style="text-align: center;">
                <a href="https://bpmce-community.vercel.app/" target="_blank">Go to Campus Connect</a>
              </p>
            </div>
            <div class="footer">
              <p>If you need any assistance, feel free to <a href="mailto:manishjhaproject@gmail.com">contact our support team</a>.</p>
              <p>&copy; 2025 Campus Connect. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `,
      });
    } catch (mailError) {
      console.error("Error sending password change email:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Password Changed",
    });
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};

// edit profile
exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, mobile } = req.body;
    const updateDetails = { firstName, lastName, bio, mobile };
    const _id = req.user._id;
    const existingUser = await User.findOne({ _id });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }
    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Details",
      });
    }
    if (req.files && req.files.image) {
      const image = req.files.image;
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid file type.",
        });
      }
      const uploadResponse = await uploadImageToCloudinary(image, 80);
      updateDetails.profilePicture = uploadResponse;
    }
    const updatedUser = await User.findOneAndUpdate({ _id }, updateDetails, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Profile Updated",
      user: updatedUser,
    });
  } catch (err) {
    // Handle any unexpected errors
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};
//
exports.getLoggedInUser= async (req, res) => {
  try {
    const _id=req.user._id
    const user=await User.findById(_id);
    if(!user){
      return res.status(404).json({
        success: false,
        message: "No User found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Internal server error",
    });
  }
};
//
exports.getUserDetails = async (req, res) => {
  try {
    const _id=req.query.userId
    const user=await User.findById(_id);
    if(!user){
      return res.status(404).json({
        success: false,
        message: "No User found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Internal server error",
    });
  }
};
