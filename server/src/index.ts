import express, { Request,Response } from "express";
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import employeeRouter from './routes/employeeRoutes'

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

app.use("/user",employeeRouter);

app.get("/api/:name",(req:Request,res:Response)=>{
    res.json({message: `Hello ${req.params.name}, from server!`});
})

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "../client/build")))

// All other GET requests not handled before will return our React app
app.get("*", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname,"../client/build","index.html"));
})