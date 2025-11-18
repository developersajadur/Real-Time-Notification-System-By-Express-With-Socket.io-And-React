import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRoute } from '../modules/Auth/auth.route';
import { teamRoutes } from '../modules/Team/team.routes';


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
    path: '/teams',
    route: teamRoutes,
  },
  {
    path: '/debates',
    route: authRoute,
  },
  {
    path: '/arguments',
    route: authRoute,
  },
  {
    path: '/votes',
    route: authRoute,
  },
  {
    path: '/',
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
