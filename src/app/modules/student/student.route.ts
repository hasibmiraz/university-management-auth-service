import { Router } from 'express';
import { StudentController } from './student.controller';

const router: Router = Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
