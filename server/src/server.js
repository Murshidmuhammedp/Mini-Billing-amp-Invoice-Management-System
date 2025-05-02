import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/authRoutes.js';
import { customerRouter } from './routes/customerRoutes.js';
import { productRouter } from './routes/productRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';

dotenv.config();
const app = express();

connectDB();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/customer', customerRouter);
app.use('/api/product', productRouter);
app.use('/api/dashboard', dashboardRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});   