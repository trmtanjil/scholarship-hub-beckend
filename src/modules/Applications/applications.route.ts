import { Router } from "express";
  import { validateRequest } from "../../middalewared/validateRequest";
import { ApplicationsController } from "./applications.controller";
import { ApplicationsValidation } from "./applications.validation";
import auth, { UserRole } from "../../middalewared/auth";

 
 
const router = Router();

router.post(
    '/apply',
    auth(UserRole.USER),
    validateRequest(ApplicationsValidation.createApplicationValidationSchema),
    ApplicationsController.applyScholarship
);

router.get(
    '/',
    auth(UserRole.ADMIN, UserRole.MODERATOR),
    ApplicationsController.getAllApplications
);

router.get(
    '/my-applications',
    auth(UserRole.USER),
    ApplicationsController.getMyApplications
);

router.get(
    '/:id',
    auth(UserRole.ADMIN, UserRole.MODERATOR),
    ApplicationsController.getSingleApplication
);

router.patch(
    '/:id/status',
    auth(UserRole.ADMIN, UserRole.MODERATOR),
    validateRequest(ApplicationsValidation.updateApplicationStatusValidationSchema),
    ApplicationsController.updateApplicationStatus
);
router.post(
    '/complete-registration',
    auth(UserRole.USER), // নিশ্চিত করো শুধু লগইন করা ইউজার পারবে
    ApplicationsController.completeRegistration
);
router.delete(
    '/:id',
    auth( UserRole.USER),
    ApplicationsController.deleteApplication
);

export const ApplicationsRoutes = router;