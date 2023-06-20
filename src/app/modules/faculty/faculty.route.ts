import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const router: Router = Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.patch('/:id', FacultyController.updateFaculty);

export const FacultyRouter = router;
