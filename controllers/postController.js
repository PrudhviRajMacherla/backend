const Post = require("../models/Post");
// creating post
exports.createPost = async (req, res) => {  
  const { title, content, } = req.body;
  // all fields are required
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    // creating the post
    //before creating the post we will store the user id which we will get from json web token
    const post = await Post.create({ title, content, author:req.user.id });
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      post:post
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// to get my post i have to check using the object id's 
exports.getMyPosts = async(req,res)=>{
    try{
        // this will return all the posts but we will remove the author 
        // as author is user itself
        const posts = await Post.find({author:req.user.id}).select('-author');
        return res.status(200).json(posts);
    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
};

exports.getAllPosts = async(req,res)=>{
    try{
        // this will return all the posts but we will remove the author 
        // as author is user itself
        const posts = await Post.find({status:"Pending"});
        return res.status(200).json(posts);
    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
};

exports.getAllApprovedPosts = async(req,res)=>{
    try{
        // this will return all the posts but we will remove the author 
        // as author is user itself
        const posts = await Post.find({status:"Approved"});
        return res.status(200).json(posts);
    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
};
