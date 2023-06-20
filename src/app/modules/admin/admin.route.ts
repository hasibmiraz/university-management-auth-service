import { Router } from 'express';
import { AdminController } from './admin.controller';

const router = Router();

router.get('/:id', AdminController.getSingleAdmin);

export const AdminRoutes = router;
