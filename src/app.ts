import { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
// import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors()); //{ origin: ['http://localhost:5173'], credentials: true }

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer !');
});

app.use(globalErrorHandler);

//Not Found
// app.use(notFound);

export default app;
