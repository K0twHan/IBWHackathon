import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();



export async function POST(req: NextRequest,res : NextResponse) {
    const token = req.headers.get('Authorization').split(' ')[1];

    const {blogId} = await req.json();
    console.log(token);
    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const blog = await prisma.blogs.findUnique({where : {id : blogId}});

    return NextResponse.json(blog, { status: 200 });
}