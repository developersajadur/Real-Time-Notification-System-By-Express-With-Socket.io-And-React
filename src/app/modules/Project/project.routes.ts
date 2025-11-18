import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { projectValidationSchema } from './project.validation';
import { projectController } from './project.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.USER),
  validateRequest(projectValidationSchema.createProject),
  projectController.createProject,
);

router.get('/get', auth(USER_ROLE.USER), projectController.getUserProjects);

router.get(
  '/get/:projectId',
  auth(USER_ROLE.USER),
  projectController.getProjectById,
);

router.patch(
  '/update/:projectId',
  auth(USER_ROLE.USER),
  validateRequest(projectValidationSchema.updateProject),
  projectController.updateProject,
);

router.delete(
  '/delete/:projectId',
  auth(USER_ROLE.USER),
  projectController.deleteProject,
);

export const projectRoutes = router;
