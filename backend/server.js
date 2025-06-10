import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import path from 'path';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import { fileURLToPath } from 'url';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// app config

const app=express();
const port=process.env.PORT || 8000
connectDB()

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// api endpoint
app.use('/api/user/',userRouter)
app.use('/api/product/',productRouter)
app.use('/api/cart/',cartRouter)
app.use('/api/order/',orderRouter)

app.get('/',(req,res)=>{
    res.send("api working message")
})
app.listen(port,()=>console.log("server is started :"+port)
)
