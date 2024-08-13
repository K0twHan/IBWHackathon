import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    const  {subject,title,content,category}  = await req.json();
    if (!category || !subject || !title || !content) {
      return NextResponse.json({ message: 'missing information' }, { status: 400 });
    }
    const email = req.headers.get('Authorization')?.split(' ')[1];
    if(!email || process.env.SECRET === undefined){
        return NextResponse.json({ message: 'Token not found' }, { status: 400 });}

    const verified = jwt.verify(email, process.env.SECRET);
    if(!verified){
        return NextResponse.json({ message: 'Token not verified' }, { status: 400 });
    }
    const decoded = jwt.decode(email)! as {email : string};
    const BloggerOrNot = await prisma.bloggers.findUnique({where : {email : decoded.email}});
    if(!BloggerOrNot){
        return NextResponse.json({ message: 'You must be a blogger for a publish blog' }, { status: 400 });
    }
    try {
        
      const author = await prisma.bloggers.findUnique({where : {email : decoded.email}});
      if(!author){
        return NextResponse.json({ message: 'Author not found' }, { status: 400 });
      }
      const blog = await prisma.blogs.create({data : {title : title,subject : subject,content : content,category : category,authorId : author?.id}});
        return NextResponse.json({ message: 'Blog created',blog }, { status: 200 });
    

    //   const blogs = await prisma.blogs.findMany({
    //     where: { authorId: author.id }
    //   });

     // return NextResponse.json({ blogs,authors }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}
