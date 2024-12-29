const mongoose = require('mongoose');

//creating a post schema
const postSchema = new mongoose.Schema({
    title:{ type: String, required: true},
    content:{ type: String, required: true },
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    status:{type:String,enum:['Approved','Pending'],default:'Pending'},
});

module.exports = mongoose.model('Post', postSchema)