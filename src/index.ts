import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import carRoutes from './routes/car.routes';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import authenticate from './middlewares/auth.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();;
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: (origin: any, callback: any) => {
    callback(null, true);
  },
  method: ["POST", "GET", "DELETE", "PUT"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/cars', authenticate, carRoutes);
app.use('/api/categories', authenticate, categoryRoutes);

mongoose.connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));