import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const router: Router = Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRouter = router;
