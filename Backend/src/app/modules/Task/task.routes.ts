import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { taskValidationSchema } from './task.validation';
import { taskController } from './task.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.USER),
  validateRequest(taskValidationSchema.createTask),
  taskController.createTask,
);

router.get('/get', auth(USER_ROLE.USER), taskController.getTasks);

router.get('/get/:taskId', auth(USER_ROLE.USER), taskController.getTask);

router.patch(
  '/update/:taskId',
  auth(USER_ROLE.USER),
  validateRequest(taskValidationSchema.updateTask),
  taskController.updateTask,
);

router.delete(
  '/delete/:taskId',
  auth(USER_ROLE.USER),
  taskController.deleteTask,
);

export const taskRoutes = router;
