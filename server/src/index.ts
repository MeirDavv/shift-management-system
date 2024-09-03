import express, { Request,Response } from "express";
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import employeeRouter from './routes/employeeRoutes';
import shiftRouter from './routes/shiftRoutes';
import unavailabilityRouter from './routes/unavailabilityRouter';
import tokenRouter from './routes/tokenRoutes'
import roleRouter from './routes/roleRoutes'
import shiftSetingsRouter from './routes/shiftSettingsRoute'


const API_URL: string = process.env.VITE_API_URL as string;
const APP_URL: string = process.env.VITE_APP_URL as string;

const app = express();
app.use(cors({
    credentials:true,
    origin: [API_URL, APP_URL]
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

app.use("/api",employeeRouter);
app.use("/api",shiftRouter);
app.use("/api",unavailabilityRouter);
app.use("/api",tokenRouter);
app.use("/api",roleRouter);
app.use("/api", shiftSetingsRouter)

app.get("/api/:name",(req:Request,res:Response)=>{
    res.json({message: `Hello ${req.params.name}, from server!`});
})

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "../../client/dist")))

// All other GET requests not handled before will return our React app
app.get("*", (req:Request,res:Response)=>{
    res.sendFile(path.resolve(__dirname,"../../client/dist/index.html"));
})