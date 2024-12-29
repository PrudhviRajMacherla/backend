const express = require("express");
const router = express.Router();
const {createPost,getMyPosts,getAllPosts,getAllApprovedPosts} = require("../controllers/postController");
const {authMiddleware} = require("../Middlewares/authMiddleware");

router.post("/createpost",authMiddleware, createPost);
router.get("/myposts",authMiddleware, getMyPosts);
router.get("/allposts",getAllPosts);
router.get("/allapprovedposts",getAllApprovedPosts);

module.exports = router;