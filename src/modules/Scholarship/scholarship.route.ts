import { Router } from 'express';
import auth, { UserRole } from '../../middalewared/auth';
import { validateRequest } from '../../middalewared/validateRequest';
import { ScholarshipValidation } from './scholarship.validation';
import { ScholarshipController } from './scholarship.controller';

const router = Router();

router.post(
    '/',
    auth(UserRole.ADMIN, UserRole.SELLER),
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
    auth(UserRole.ADMIN, UserRole.SELLER),
    validateRequest(ScholarshipValidation.updateScholarshipValidationSchema),
    ScholarshipController.updateScholarship
);

router.delete(
    '/:id',
    auth(UserRole.ADMIN),
    ScholarshipController.deleteScholarship
);

export const ScholarshipRoutes = router;