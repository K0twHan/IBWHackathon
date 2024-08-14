import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

type ResponseData = {
    message: string;
    user?: {
        firstName: string;
        lastName: string;
        email: string;
    };
};


export async function POST(req: NextRequest) {
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Bearer token
    if (!token || process.env.SECRET === undefined) {
        return NextResponse.json({ message: 'Token not found' }, { status: 401 });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        if (typeof verified === 'string') {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const data = jwt.decode(token) as { email: string };
        const { name, surname, email,walletAddress,gender,birthday,address, username} = await req.json();
        let cinsiyet;
        if(gender == 'Erkek'){
            cinsiyet = true;
        }
        else{
            cinsiyet = false;
        }
        const user = await prisma.users.update({
            where: { email: data.email },
            data: {
                name: name,
                surname: surname,
                email: email,
                walletAddress: walletAddress,
                sex: cinsiyet,
                username: username,
                birthday: new Date(birthday),
                address: address
            },
        });

        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}