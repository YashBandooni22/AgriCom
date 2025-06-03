import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import customerRouter from './routes/customerRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/admin', adminRouter);      
app.use('/api/seller', sellerRouter);    
app.use('/api/customer', customerRouter); 

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => console.log("Server Started", port));
