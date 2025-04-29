import { PrismaClient } from '../../generated/prisma';

export const GET = async () => {
  const prisma = new PrismaClient();
  const board = await prisma.board.findFirst();
  return Response.json({ board });
};
