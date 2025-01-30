const { Market } = require("../model/marketModel");
const {
  uploadImageToCloudinary,
  deleteFileFromCloudinary,
} = require("../utills/cloudinary");

exports.addItem = async (req, res) => {
  try {
    const { category, description, price, productName } = req.body;
    if (!productName || !price) {
      return res.status(400).json({
        success: false,
        message: "Product details missing",
      });
    }
    const sellerId = req.user._id;
    const productDetails = {
      productName,
      description,
      category,
      price,
      sellerId,
    };
    if (req.files && req.files.image) {
      const image = req.files.image;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid file type",
        });
      }
      const uploadResponse = await uploadImageToCloudinary(image, 70);
      productDetails.image = uploadResponse;
    }
    const market = await Market.create(productDetails);
    const createdMarket = await market.populate(
      "sellerId",
      "firstName lastName profilePicture"
    );
    return res.status(200).json({
      success: true,
      message: "Item added",
      product:createdMarket
    });
  } catch (err) {
    return res.status(500).json({
      err: err,
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const products = await Market.find()
      .populate("sellerId", "firstName lastName profilePicture")
      .sort({ createdAt: -1 });
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Items Available",
      });
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Internal Server Error!",
    });
  }
};
