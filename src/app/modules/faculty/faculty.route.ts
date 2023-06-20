import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router: Router = Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRouter = router;
