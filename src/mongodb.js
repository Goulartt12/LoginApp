const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/LoginApp")
.then(()=>{
    console.log("mongo connected")
})
.catch(()=>{
    console.log("failed to connect")
});

const loginSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("Collection1", loginSchema);

module.exports = collection;