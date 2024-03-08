const express = require("express");
const app = express();
const collection = require("./mongodb");

app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("login")
});

app.get("/signup", (req,res)=>{
    res.render("signup")
});

app.get("/forgotpass", (req,res)=>{
    res.render("forgotpass")
});

app.post("/signup", async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    const check = await collection.findOne({name:req.body.name});
    if (check) {
        res.send("Username already exists")
    }
    else{
        await collection.insertMany([data]);
        res.send("Registered!")
    }
});

app.post("/login", async(req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.name});
        if (check.password===req.body.password) {
            res.render("home");
        }
        else(
            res.send("wrong password")
        )    
    }
    catch(e){
        res.send("wrong details");
    }
});

app.post("/forgotpass", async(req,res)=>{
    try {
        const check = await collection.findOne({name:req.body.name});
        if(!check){
            res.send("Name not found");
        }
        else if(check.password!= req.body.password){

            const data = req.body.password;
            
            await collection.updateOne({name: req.body.name}, {$set: {password: data}});
            res.send("Password updated");
        }
        else if(check.password===req.body.password){
            res.send("Can not change to a old password");
        }

    }
    catch (e){
        res.send("Could not update");
    }
})

app.listen(3000,()=>{
    console.log("port connected");
});
