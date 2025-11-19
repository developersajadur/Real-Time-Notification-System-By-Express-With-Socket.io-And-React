import express from 'express';
import { activityController } from './activity.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/get', auth(USER_ROLE.USER), activityController.listActivity);

export const activityRoutes = router;
