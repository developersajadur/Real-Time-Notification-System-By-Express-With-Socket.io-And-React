import express from 'express';
import { reassignController } from './reassign.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';


const router = express.Router();

router.post('/', auth(USER_ROLE.USER), reassignController.reassignTasks);

export const reassignRoutes = router;
