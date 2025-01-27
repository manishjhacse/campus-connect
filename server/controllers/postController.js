const { Post } = require("../model/postModel");
const { uploadImageToCloudinary } = require("../utills/cloudinary");

exports.addpost = async (req, res) => {
  try {
    const { text } = req.body;
    const authorId = req.user._id;
    const image = req.files.image;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(image.mimetype)) {
      return res.status(400).json({ message: "Invalid file type." });
    }
    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Post Details missing",
      });
    }
    const uploadResponse = await uploadImageToCloudinary(image, 65);
    const post = await Post.create({
      authorId,
      content:text,
      media:uploadResponse,
    });
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Error: err,
      message: "Something went wrong!",
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "firstName lastName profilePicture") // Include only `name` and `image` from the User model
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Something went wrong while fetching the posts!",
    });
  }
};
