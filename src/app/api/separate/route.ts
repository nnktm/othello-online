import { PrismaClient } from '../../../generated/prisma';

export const GET = async (req: Request) => {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ error: 'id が必要です' }), {
      status: 400,
    });
  }

  const board = await prisma.board.findUnique({
    where: {
      id,
    },
    select: {
      board: true,
      turn: true,
      black: true,
      white: true,
    },
  });
  return Response.json({ board });
};

export const PUT = async (req: Request) => {
  const prisma = new PrismaClient();
  const { id, board, turn } = (await req.json()) as { id: string; board: number[][]; turn: number };

  const newBoard = await prisma.board.update({
    where: { id },
    data: { board, turn },
  });

  return Response.json({ newBoard });
};

export const DELETE = async (req: Request) => {
  const prisma = new PrismaClient();
  const { id } = (await req.json()) as { id: string };
  await prisma.board.delete({ where: { id } });
  return Response.json({ message: 'Board deleted' });
};
