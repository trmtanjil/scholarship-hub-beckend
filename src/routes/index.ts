import { Router } from 'express';
import { TModuleRoute } from '../interface/route.interface';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
