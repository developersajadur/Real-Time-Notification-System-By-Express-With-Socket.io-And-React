import express from 'express';
import { memberController } from './member.controller';
import validateRequest from '../../middlewares/validateRequest';
import { memberValidationSchema } from './member.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.USER),
  validateRequest(memberValidationSchema.createMember),
  memberController.createMember,
);

router.get('/get', auth(USER_ROLE.USER), memberController.getMembers);

router.get('/:id', auth(USER_ROLE.USER), memberController.getMember);

router.patch(
  '/update/:id',
  auth(USER_ROLE.USER),
  validateRequest(memberValidationSchema.updateMember),
  memberController.updateMember,
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.USER),
  memberController.deleteMember,
);

export const memberRoutes = router;
