import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { create } from 'qrcode';

const prisma = new PrismaClient();



export async function GET(req: NextRequest,res : NextResponse) {
    const token = req.headers.get('Authorization').split(' ')[1];
    console.log(token);
    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const blogs = await prisma.blogs.findMany({select : {id : true,title : true,content : true,authorId : true,category : true,created_date : true , subject : true , _count : {select : {likes : true,comments : true}}}});
    const authorIds = blogs.map(blog => blog.authorId);
    const authors = await prisma.bloggers.findMany({
        where: {
            id: { in: authorIds }
        },select : {id : true,name : true,surname : true}
    });
    console.log(blogs);
    return NextResponse.json([blogs,authors], { status: 200 });
}