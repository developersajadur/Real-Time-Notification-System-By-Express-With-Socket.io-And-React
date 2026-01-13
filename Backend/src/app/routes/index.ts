import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRoute } from '../modules/Auth/auth.route';
import { categoryRoutes } from '../modules/Category/category.route';
import { subscriptionRoutes } from '../modules/Subscription/subscription.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
    {
    path: '/subscriptions',
    route: subscriptionRoutes,
  },

  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
