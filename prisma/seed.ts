import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: Array.from({ length: 10 }).map((_, index) => ({
      username: `user${index}`,
      password: `password${index}`,
      profile_icon: `icon${index}`,
      favorites: [`favorite${index}`, `favorite${index + 1}`],
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
