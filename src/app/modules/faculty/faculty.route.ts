import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const router: Router = Router();

router.get('/:id', FacultyController.getSingleFaculty);

export const FacultyRouter = router;
