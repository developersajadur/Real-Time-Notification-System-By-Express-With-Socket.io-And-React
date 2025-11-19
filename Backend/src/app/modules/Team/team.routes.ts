import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { teamValidationSchema } from './team.validation';
import { teamController } from './team.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.USER),
  validateRequest(teamValidationSchema.createTeam),
  teamController.createTeam,
);

router.get('/get', auth(USER_ROLE.USER), teamController.getUserTeams);

router.get('/get/:teamId', auth(USER_ROLE.USER), teamController.getTeamById);

router.patch(
  '/update/:teamId',
  auth(USER_ROLE.USER),
  validateRequest(teamValidationSchema.updateTeam),
  teamController.updateTeam,
);

router.delete(
  '/delete/:teamId',
  auth(USER_ROLE.USER),
  teamController.deleteTeam,
);

export const teamRoutes = router;
