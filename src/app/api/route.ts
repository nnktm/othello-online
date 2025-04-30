import { PrismaClient } from '../../generated/prisma';

export const GET = async () => {
  const prisma = new PrismaClient();
  const board = await prisma.board.findFirst({
    select: {
      board: true,
      turn: true,
    },
  });
  return Response.json({ board });
};

export const PUT = async (req: Request) => {
  const prisma = new PrismaClient();
  const { board, turn } = await req.json();

  const newBoard = await prisma.board.update({
    where: { id: '1' },
    data: { board, turn },
  });

  return Response.json({ newBoard });
};
