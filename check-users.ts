import { PrismaClient } from "@prisma/client/extension";


const prisma = new PrismaClient();

async function checkUsers() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      password: true,
    },
  });
  console.log(JSON.stringify(users, null, 2));
}

checkUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
