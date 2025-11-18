import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRoute } from '../modules/Auth/auth.route';
import { teamRoutes } from '../modules/Team/team.routes';
import { projectRoutes } from '../modules/Project/project.routes';
import { reassignRoutes } from '../modules/Reassign/reassign.routes';
import { taskRoutes } from '../modules/Task/task.routes';
import { activityRoutes } from '../modules/ActivityLog/activity.routes';
import { dashboardRoutes } from '../modules/Dashboard/dashboard.routes';


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
    path: '/projects',
    route: projectRoutes,
  },
  {
    path: '/tasks',
    route: taskRoutes,
  },
  {
    path: '/reassigns',
    route: reassignRoutes,
  },
  {
    path: '/activities',
    route: activityRoutes,
  },
    {
    path: '/dashboard',
    route: dashboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
