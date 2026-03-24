import bcrypt from "bcrypt";
import config from "../src/config";
import { prisma } from "../src/lib/prisma";



async function main() {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";
  const saltRounds = Number(config.bcrypt_salt_rounds) || 12;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "Admin",
      },
    });
    console.log("Admin user created successfully!");
  } else {
    console.log("Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
