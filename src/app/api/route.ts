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
  const { board, turn } = (await req.json()) as { board: number[][]; turn: number };

  const newBoard = await prisma.board.update({
    where: { id: '1' },
    data: { board, turn },
  });

  return Response.json({ newBoard });
};

export const POST = async () => {
  const prisma = new PrismaClient();
  const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const newBoard = await prisma.board.create({
    data: {
      board: initialBoard,
      turn: 1,
    },
  });
  return Response.json({ id: newBoard.id });
};
