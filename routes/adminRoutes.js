const express = require("express");
const router = express.Router();
const {approvePost,getAllUsers} = require("../controllers/adminController");
const { roleMiddleware } = require("../Middlewares/roleMiddleware");
const{authMiddleware} = require("../Middlewares/authMiddleware");

router.get("/users",authMiddleware,roleMiddleware,getAllUsers);//for getting all users
router.patch("/post/:postId",authMiddleware,roleMiddleware, approvePost);//for approving the post

module.exports = router;