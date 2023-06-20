import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { managementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router: Router = Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  managementDepartmentController.createDepartment
);

export const ManagementDepartmentRoutes = router;
