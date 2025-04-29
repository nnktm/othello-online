import { PrismaClient } from '../../generated/prisma';

export const GET = async () => {
  const prisma = new PrismaClient();
  const board = await prisma.board.findFirst();
  return Response.json({ board });
};

export const PUT = async (req: Request) => {
  const prisma = new PrismaClient();
  const { board } = await req.json();

  const newBoard = await prisma.board.update({
    where: { id: '1' },
    data: { board },
  });

  return Response.json({ newBoard });
};
