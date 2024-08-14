// route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import speakeasy from 'speakeasy'; // 2FA işlemleri için speakeasy kütüphanesi

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    console.log('verifyOTP');
    console.log(req.method);
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        const { twoFACode, email } = await req.json();
        console.log(twoFACode, email);
        if (!twoFACode || !email) {
            return NextResponse.json({ message: 'OTP Code and email are required' }, { status: 400 });
        }

        const user = await prisma.users.findFirst({
            where: {
                email: email
            },
        });

        if (!user || !user.secret) {
            return NextResponse.json({ message: 'User not found or 2FA not enabled' }, { status: 404 });
        }

        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token: twoFACode,
        });

        if (verified) {
            // OTP kodu doğrulandı, kullanıcıya erişim sağla
            return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
        } else {
            // OTP kodu doğrulanamadı
            return NextResponse.json({ message: 'Invalid OTP code' }, { status: 599 });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
