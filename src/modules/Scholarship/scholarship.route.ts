import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ScholarshipController } from './scholarship.controller';
import { ScholarshipValidation } from './scholarship.validation';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.post(
    '/',
    auth(Role.Admin, Role.Moderator),
    validateRequest(ScholarshipValidation.createScholarshipValidationSchema),
    ScholarshipController.createScholarship
);

router.get(
    '/',
    ScholarshipController.getAllScholarships
);

router.get(
    '/:id',
    ScholarshipController.getSingleScholarship
);

router.patch(
    '/:id',
    auth(Role.Admin, Role.Moderator),
    validateRequest(ScholarshipValidation.updateScholarshipValidationSchema),
    ScholarshipController.updateScholarship
);

router.delete(
    '/:id',
    auth(Role.Admin),
    ScholarshipController.deleteScholarship
);

export const ScholarshipRoutes = router;
