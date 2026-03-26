import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "./src/generated/prisma/client";
import config from "./src/config/index";

const connectionString = config.database_url as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Checking for admin@gmail.com...");
    const user = await prisma.user.findUnique({
        where: { email: "admin@gmail.com" }
    });
    if (user) {
        console.log("Admin found!");
        console.log("Email:", user.email);
        console.log("Role:", user.role);
    } else {
        console.log("Admin NOT found!");
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
