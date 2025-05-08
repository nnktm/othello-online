import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

export const GET = async () => {
  const prisma = new PrismaClient();
  const boards = await prisma.board.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      black: true,
      white: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      end: true,
      resultBlack: true,
      resultWhite: true,
      result: true,
    },
  });

  return NextResponse.json({ boards });
};
