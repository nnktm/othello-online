import { PrismaClient } from '../../../generated/prisma';
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
