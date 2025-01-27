const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token || token == undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised Access",
      });
    }
    try {
        const payload = jwt.verify(token, process.env.SECRETCODE);
        req.user = payload;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised Access",
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
