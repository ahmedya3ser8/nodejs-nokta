import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import errorMiddleware from './middlewares/error.middleware.js';
import ApiError from './utils/ApiError.js';

import authRoutes from './routes/auth.routes.js';
import noktaRoutes from './routes/nokta.routes.js';

const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  'https://nokta-v1.vercel.app'
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new ApiError(`CORS blocked: origin "${origin}" is not allowed.`, 403))
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API IS RUNNING SUCCESSFULLY!'
  })
});

app.use('/api/auth', authRoutes);
app.use('/api/nokta', noktaRoutes);

app.use((req, res, next) => {
  next(new ApiError(`This resource: ${req.originalUrl} is not available`, 400));
});

app.use(errorMiddleware);

export default app;
