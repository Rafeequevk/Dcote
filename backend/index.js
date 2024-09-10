import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import bookingRoute from './routes/bookingRoute.js'
import { connectDB } from "./config/db.js";
import path from 'path'
import cors from 'cors';


const app = express()
app.use('/images',express.static(path.join(path.resolve(),'public/images')))

app.use (express.json())
app.use(cors());
const PORT = ENV_VARS.PORT
app.get('/',(req,res)=>{
    res.status(234).send("welcome");
})

app.use('/booking',bookingRoute)

app.listen(PORT,()=>{
console.log(`app Listening Port ${PORT}`);
connectDB();

})