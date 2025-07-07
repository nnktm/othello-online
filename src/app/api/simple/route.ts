import { PrismaClient } from '../../../generated/prisma';

export const GET = async () => {
  const prisma = new PrismaClient();

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: '1',
      },
      select: {
        board: true,
        black: true,
        white: true,
        turn: true,
      },
    });
    return Response.json({ board });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  const prisma = new PrismaClient();

  try {
    const { board, turn } = (await req.json()) as { board: number[][]; turn: number };

    const newBoard = await prisma.board.update({
      where: { id: '1' },
      data: { board, turn },
    });

    return Response.json({ newBoard });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  const prisma = new PrismaClient();

  try {
    const { blackPlayer } = (await req.json()) as {
      blackPlayer: string;
    };

    const whitePlayer = '';
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
        black: blackPlayer,
        white: whitePlayer,
        board: initialBoard,
        turn: 1,
        end: false,
        resultBlack: 2,
        resultWhite: 2,
        result: '',
      },
    });
    return Response.json({ id: newBoard.id });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
