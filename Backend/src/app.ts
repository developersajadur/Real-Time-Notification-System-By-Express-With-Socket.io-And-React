import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server Is Running',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
