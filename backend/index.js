const express=require("express");
const server=express();
const cors=require("cors");
const mongoose=require("mongoose");
const rootRoute = require("./routes/rootRoute");
const dotenv = require("dotenv");
dotenv.config();


server.use(express.json());
server.use(cors());


try{
    mongoose.connect(process.env.database_url)
      .then(()=> {
        console.log("connected to db")
      })
}catch (err) {
    console.log("error connecting to db")
}

server.use("/api/v1", rootRoute );

server.listen("3000",()=> {
    console.log("server running on port 3000")
})