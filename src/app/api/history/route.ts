import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

export const GET = async () => {
  try {
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
        watch: true,
        preservation: true,
        resultBlack: true,
        resultWhite: true,
        result: true,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ boards });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};
