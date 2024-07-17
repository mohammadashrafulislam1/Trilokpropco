import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { statusRouter } from "./Routers/status.js";
import { typeRouter } from "./Routers/type.js";
import { amenitiesRouter } from "./Routers/amenities.js";
import { developerRouter } from "./Routers/developer.js";
import { propertyRouter } from "./Routers/property.js";
import { blogCategoryRouter } from "./Routers/blogCategory.js";
import { blogRouter } from "./Routers/blog.js";

const app = express();
const PORT = 5000;
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/status', statusRouter)
app.use('/type', typeRouter)
app.use('/amenity', amenitiesRouter)
app.use('/developer', developerRouter)
app.use('/property', propertyRouter)
app.use('/blogCategory', blogCategoryRouter)
app.use('/blog', blogRouter)

const dbName = "Trilokpropco"
const dbUser = process.env.DBUSER
const dbPassword = process.env.DBPASS
try{
  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.g2lboph.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
  console.log("DataBase Connected")
}
catch (e){
    console.log("Error on mongodb:",e)
}

app.get('/', (req, res)=>{
    res.send("Backend is Running")
})

app.listen(PORT, ()=>{
    console.log(`Backend is running on port ${PORT}`)
})