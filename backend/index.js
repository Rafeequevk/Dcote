import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import bookingRoute from './routes/bookingRoute.js'
import { connectDB } from "./config/db.js";
import path from 'path'
import cors from 'cors';


const app = express()
app.use('/images',express.static(path.join(path.resolve(),'public/images')))

app.use (express.json())

const corsOptions = {
    // origin: 'https://dcote-frontend.onrender.com' , //' Specify your frontend domain'
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

app.use(cors(corsOptions));
const PORT = ENV_VARS.PORT
app.get('/',(req,res)=>{    
    res.status(234).send("welcome");
})

app.use('/api/v1/booking',bookingRoute)

app.listen(PORT,()=>{
console.log(`app Listening Port ${PORT}`);
connectDB();

})