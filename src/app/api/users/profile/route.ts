import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();


export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method === 'GET') {
    const  token = await req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Please Signin before reach to profile page' }, { status: 400 });
    }
    const verified = jwt.verify(token, process.env.SECRET!);
    if(!verified){
        return NextResponse.json({ message: 'Token not verified' }, { status: 400 });
    }
    const decoded = jwt.decode(token)! as {email : string};
    try {
      const user = await prisma.users.findUnique({where : {email : decoded.email},select : {id : true,name : true,surname:true,username : true,email : true,address : true,walletAddress : true,birthday:true,sex:true}});
      if(!user){
        return NextResponse.json({ message: 'User not found' }, { status: 400 });
      }
      console.log(user);
      
      
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }

    



   
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}