import { PrismaClient } from '@prisma/client';

<<<<<<< HEAD
const prisma = new PrismaClient();
export default prisma;
=======
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
>>>>>>> fff3ca014e8cf2b926f07e021f148b4af1ea8f73
