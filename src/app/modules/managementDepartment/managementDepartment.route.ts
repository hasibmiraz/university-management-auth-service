import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router: Router = Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.get('/:id', ManagementDepartmentController.getSingleDepartment);
router.patch('/:id', ManagementDepartmentController.updateDepartment);
router.delete('/:id', ManagementDepartmentController.deleteDepartment);

export const ManagementDepartmentRoutes = router;
