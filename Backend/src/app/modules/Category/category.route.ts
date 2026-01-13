import { Router } from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';

const router = Router();

router.post(
  '/create',
  auth(USER_ROLE.ADMIN),
  validateRequest(categoryValidation.createCategorySchema),
  categoryController.createCategory,
);

router.get(
  '/get-all',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  categoryController.getAllCategoryByQuery,
);

router.get(
  '/get/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  categoryController.getCategoryById,
);

router.patch(
  '/update/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(categoryValidation.updateCategorySchema),
  categoryController.updateCategory,
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.ADMIN),
  categoryController.deleteCategory,
);

export const categoryRoutes = router;
