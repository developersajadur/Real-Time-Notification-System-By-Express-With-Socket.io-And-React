import express from 'express';
import { dashboardController } from './dashboard.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/summary', auth(USER_ROLE.USER), dashboardController.getSummary);

export const dashboardRoutes = router;
