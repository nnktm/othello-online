import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

export const GET = async () => {
  try {
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

    return NextResponse.json({ boards });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
};
