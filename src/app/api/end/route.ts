import { PrismaClient } from '../../../generated/prisma';
export const PUT = async (req: Request) => {
  const prisma = new PrismaClient();
  const { id, end } = (await req.json()) as { id: string; end: boolean };

  const newBoard = await prisma.board.update({
    where: { id },
    data: { end },
  });

  return Response.json({ newBoard });
};
