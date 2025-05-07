import { PrismaClient } from '../../../generated/prisma';
export const PUT = async (req: Request) => {
  const prisma = new PrismaClient();
  const { id, whitePlayer } = (await req.json()) as { id: string; whitePlayer: string };

  const newBoard = await prisma.board.update({
    where: { id },
    data: { white: whitePlayer },
  });

  return Response.json({ id: newBoard.id });
};
