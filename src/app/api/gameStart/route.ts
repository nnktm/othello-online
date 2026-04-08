import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

export const PUT = async (req: Request) => {
  try {
    const { id, whitePlayer } = (await req.json()) as { id: string; whitePlayer: string };

    const newBoard = await prisma.board.update({
      where: { id },
      data: { white: whitePlayer },
    });

    return Response.json({ id: newBoard.id });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
