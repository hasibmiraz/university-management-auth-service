import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/Users/user.route';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/user', userRouter);

app.get('/', async (req: Request, res: Response) => {
  res.send('success');
});
