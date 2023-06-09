import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import boughtRouter from './routes/boughtRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('We are live');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/bought', boughtRouter);
app.use('/api/wishlist', wishlistRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
