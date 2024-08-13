import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { comment } from 'postcss';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const verified = jwt.verify(token, process.env.SECRET);
        if (!verified) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        
        const { blogId } = await req.json();
        const decoded = jwt.decode(token);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const blog = await prisma.blogs.findUnique({
            where: { id: blogId },
            include: {
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({
            likes: blog._count.likes,
            comments: blog._count.comments
        }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
    }
}
