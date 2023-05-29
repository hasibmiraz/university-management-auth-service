import { Router } from 'express';
import createUser from './users.controller';

const router: Router = Router();

router.post('/create-user', createUser);

export default router;
