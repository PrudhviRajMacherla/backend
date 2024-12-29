exports.roleMiddleware = async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Admin") {
        return res.status(401).json({ success: false, message: "Unauthorized" }); 
    }
    next();
};