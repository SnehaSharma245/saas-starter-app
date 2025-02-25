// Ye code ek PrismaClient singleton instance banane aur usse manage karne ke liye hai, jo PostgreSQL (ya kisi bhi database jisse Prisma connected hai) ke saath interact karne ke liye use hota hai.

import { PrismaClient } from "@prisma/client";

const prismaClientSinglton = () => {
  return new PrismaClient();
};

type prismaClientSinglton = ReturnType<typeof prismaClientSinglton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSinglton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
