import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL= process.env.MONGO_URL || "mongodb://localhost:27017/";

/*Code for connecting to database*/
mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("DB connected")
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
        });
    })
    .catch((error)=> console.log(error));

app.use("/api", route);