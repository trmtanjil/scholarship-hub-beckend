import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationsController } from './applications.controller';
import { ApplicationsValidation } from './applications.validation';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.post(
    '/apply',
    auth(Role.User),
    validateRequest(ApplicationsValidation.createApplicationValidationSchema),
    ApplicationsController.applyScholarship
);

router.get(
    '/',
    auth(Role.Admin, Role.Moderator),
    ApplicationsController.getAllApplications
);

router.get(
    '/my-applications',
    auth(Role.User),
    ApplicationsController.getMyApplications
);

router.get(
    '/:id',
    auth(Role.Admin, Role.Moderator, Role.User),
    ApplicationsController.getSingleApplication
);

router.patch(
    '/:id/status',
    auth(Role.Admin, Role.Moderator),
    validateRequest(ApplicationsValidation.updateApplicationStatusValidationSchema),
    ApplicationsController.updateApplicationStatus
);

router.patch(
    '/:id',
    auth(Role.User),
    validateRequest(ApplicationsValidation.updateApplicationValidationSchema),
    ApplicationsController.updateApplication
);

router.delete(
    '/:id',
    auth(Role.User),
    ApplicationsController.deleteApplication
);

export const ApplicationsRoutes = router;
