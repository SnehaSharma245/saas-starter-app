// Ye code ek PrismaClient singleton instance banane aur usse manage karne ke liye hai, jo PostgreSQL (ya kisi bhi database jisse Prisma connected hai) ke saath interact karne ke liye use hota hai.

//PrismaClient singleton instance ka matlab hai ek aisa object jo aapke application me ek hi baar banega aur har jagah use hoga.

// PrismaClient ek ORM (Object Relational Mapping) tool ka part hai jo database queries ko manage karta hai. Singleton approach ensure karta hai ki unnecessary multiple database connections na banayein

// PrismaClient ek tool hai jo backend aur database ke beech ka connection manage karta hai aur queries run karne ke liye use hota hai. Iska kaam hai SQL queries ko abstract karke JavaScript/TypeScript code me simplify karna.

//PrismaClient se Prisma ke auto-generated types aur methods use kar sakte ho.
import { PrismaClient } from "@prisma/client";

//Ye ek function hai jo har baar call hone par PrismaClient ka naya instance return karta hai.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

//Iska use development environment me hota hai to persist a single PrismaClient instance across multiple files/modules.
//globalForPrisma object define kiya gaya hai jisme prisma property ho sakti hai (jo ya to PrismaClient instance hoga ya undefined).
//Node.js environment me globalThis ek global object hota hai jo globally accessible variables ko manage karta hai.
//unknown is a TypeScript type that represents an unknown value.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// prisma variable ko initialize karte hain.
// Agar globalForPrisma.prisma pehle se defined hai, to uska use karega (singleton behavior).
// Agar undefined hai, to prismaClientSingleton() call karke ek naya PrismaClient instance banayega.

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

//Ye line ensure karti hai ki development environment me singleton PrismaClient instance globalForPrisma.prisma me store ho jaye.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
