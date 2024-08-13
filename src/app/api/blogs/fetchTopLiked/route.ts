import { PrismaClient } from '@prisma/client';
import next from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            const topLikedBlogs = await prisma.blogs.findMany({
                orderBy: {
                    likes: {
                        _count: 'desc',
                    },
                },
                take: 5, // En çok beğenilen 5 blogu getir
                select: {
                    id: true,
                    title: true,
                    _count: {
                        select: { likes: true },
                    },
                },
            });

           return NextResponse.json(topLikedBlogs, { status: 200 });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
