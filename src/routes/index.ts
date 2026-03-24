import { Router } from 'express';
import { TModuleRoute } from '../interface/route.interface';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  // {
  //   path: '/example',
  //   route: ExampleRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
