import * as trpc from '@trpc/server';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const createContext = () => {
  return {
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
