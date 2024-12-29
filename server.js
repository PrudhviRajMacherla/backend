const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors({
    origin:"*",
    credentials:true,
}));
app.use(express.json());


//database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})

// contains login and register
app.use("/api/auth",authRoutes);
// contains cratePost getMyPost 
app.use("/api/post",postRoutes);
// contains see all user , approve posts
app.use("/api/admin",adminRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});
//running the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
