const express=require("express");
const cors=require("cors");
const users=require("./sample.json");
const fs=require("fs");

const app=express();
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

app.listen(port,(err)=>{
    console.log(`App is running in port ${port}`);
});

