import { Prisma, PrismaClient } from '@prisma/client';

export const prisma_db = (test: boolean) => {
  let prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

  if (test) {
  } else {
    prisma = new PrismaClient();
  }

  return prisma;
};
