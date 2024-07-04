import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors())

app.get('/', (req, res)=>{
    res.send("Backend is Running")
})

app.listen(PORT, ()=>{
    console.log(`Backend is running on port ${PORT}`)
})