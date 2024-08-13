import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

type ResponseData = {
    message: string;
    token?: string;
}

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {
        const hashedPassword = await prisma.bloggers.findUnique({
            where: { email },
            select: { password: true }
        });

        if (!hashedPassword) {
            return NextResponse.json({ message: 'User not found' }, { status: 401 });
        }

        const comparedPassword = await bcrypt.compare(password, hashedPassword.password);
        if (comparedPassword) {
            const secret = process.env.SECRET;
            if (secret) {
                const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
                return NextResponse.json({ message: 'User signed in', token }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Secret not defined' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
