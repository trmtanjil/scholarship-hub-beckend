Scholarship Hub Backend
A robust, scalable, and secure Scholarship Management System backend built with a focus on high-performance API delivery and strict role-based access control.

🛠 Tech Stack
This project leverages a modern tech stack to ensure type safety and seamless integration:

Runtime: Node.js (v18+)

Framework: Express.js with TypeScript

Database: PostgreSQL

ORM: Prisma

Authentication: BetterAuth (Session-based with Google OAuth)

Payment Gateway: Stripe (Supports BDT/International transactions)

Validation: Zod for schema-based data validation

 Key Features
Modular 3-Layer Architecture: Follows the Route -> Controller -> Service pattern for high maintainability and clean code separation.

Role-Based Access Control (RBAC): Granular permissions for USER, MODERATOR, and ADMIN roles to ensure data integrity.

Secure Authentication: Powered by BetterAuth with advanced cookie configurations (Secure, HttpOnly, SameSite: None, Partitioned) for cross-domain security.

Scholarship Management: Full CRUD operations with advanced filtering by category, university name, and subject.

Payment Processing: Secure payment intent generation using Stripe, specifically optimized for scholarship application fees.

Global Error Handling: Centralized middleware to catch and format server/database errors consistently.

CORS & Proxy Trust: Configured for deployment on platforms like Vercel or Render with trust proxy enabled.
