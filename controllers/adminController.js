const Post = require("../models/Post");
const User = require("../models/User");
exports.approvePost = async (req, res) => {
    try{
        // getting the post id
        console.log('inside approve post')
        const{postId} = req.params;
        // approving the post
        const post = await Post.findByIdAndUpdate(postId,{status:"Approved"},{new:true});
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post Not Found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Post approved successfully",
          });    
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
};

// before getting all users we have to check if the user is admin create a middleware
exports.getAllUsers = async (req, res) => {
    try{
        // this will return all the users
        const users = await User.find({role:"User"}).select('-password');
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
    }
};