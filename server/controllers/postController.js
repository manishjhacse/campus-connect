const { Post } = require("../model/postModel");
const {
  uploadImageToCloudinary,
  deleteFileFromCloudinary,
} = require("../utills/cloudinary");

exports.addpost = async (req, res) => {
  try {
    const { text } = req.body;
    const authorId = req.user._id;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    let postDetails = { authorId, content: text };

    if (req.files && req.files.image) {
      const image = req.files.image;

      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid file type.",
        });
      }
      const uploadResponse = await uploadImageToCloudinary(image, 70);
      postDetails.media = uploadResponse;
    }

    if (!postDetails.content && !postDetails.media) {
      return res.status(400).json({
        success: false,
        message: "Post details missing.",
      });
    }
    const post = await Post.create(postDetails);
    const populatedPost = await post.populate(
      "authorId",
      "firstName lastName profilePicture"
    );
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (err) {
    console.error("Error creating post:", err.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "firstName lastName profilePicture")
      .sort({ timestamp: -1 });

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
      message: "Internal Server Error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = req.query;
    const autherId = req.user._id;
    if (String(post.authorId._id) != String(autherId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    if (post.media) {
      await deleteFileFromCloudinary(post.media);
    }
    const deletedPost = await Post.findByIdAndDelete(post._id);
    return res.status(200).json({
      success: true,
      message: "Post Deleted",
      post: deletedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Internal Server Error",
    });
  }
};

exports.getUserPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ authorId: userId })
      .populate("authorId", "firstName lastName profilePicture")
      .sort({ timestamp: -1 });

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
      message: "Internal Server Error",
    });
  }
};
exports.getOtherPost = async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await Post.find({ authorId: userId })
      .populate("authorId", "firstName lastName profilePicture")
      .sort({ timestamp: -1 });

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
      message: "Internal Server Error",
    });
  }
};
