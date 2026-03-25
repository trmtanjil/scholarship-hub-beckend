import { Router } from 'express';
import { TModuleRoute } from '../interface/route.interface';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { ScholarshipRoutes } from '../modules/Scholarship/scholarship.route';
import { ApplicationsRoutes } from '../modules/Applications/applications.route';

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
  {
    path: '/applications',
    route: ApplicationsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
