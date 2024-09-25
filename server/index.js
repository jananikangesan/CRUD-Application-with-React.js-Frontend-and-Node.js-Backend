const express=require("express");
const cors=require("cors");
const users=require("./sample.json");
const fs=require("fs");

const app=express();
app.use(express.json());

const port=8000;

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
    })
);

//Display All Users
app.get("/users",(req,res)=>{
    return res.json(users);
});

//DELETE user details.
app.delete("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let filteredUsers=users.filter((user)=>user.id!==id);
    fs.writeFile("./sample.json",JSON.stringify(filteredUsers),(err,data)=>{
       return res.json(filteredUsers);
    })

})

//ADD new user details.
app.post("/users",(req,res)=>{
    let {name,age,city}=req.body;
    if(!name || !age || !city){
        res.status(400).send({"message":"All Fields Required"});
    }
    let id=Date.now();
    users.push({id,name,age,city});

    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({"message":"User detail added sucessfully"});
     })
 
    
});

app.listen(port,(err)=>{
    console.log(`App is running in port ${port}`);
});

