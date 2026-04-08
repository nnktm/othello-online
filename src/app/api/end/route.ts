import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

export const PUT = async (req: Request) => {
  try {
    const { id, end, resultBlack, resultWhite, result } = (await req.json()) as {
      id: string;
      end: boolean;
      resultBlack: number;
      resultWhite: number;
      result: string;
    };

    const newBoard = await prisma.board.update({
      where: { id },
      data: { end, resultBlack, resultWhite, result },
    });

    return Response.json({ newBoard });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
