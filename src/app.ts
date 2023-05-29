import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { createUser } from './app/modules/Users/users.service';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  const createdUser = await createUser({
    id: '00001',
    role: 'student',
    password: 'password',
  });
  res.send(createdUser);
});
