import { Router } from 'express';
import { TModuleRoute } from '../interface/route.interface';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { ScholarshipRoutes } from '../modules/Scholarship/scholarship.route';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/scholarships',
    route: ScholarshipRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
