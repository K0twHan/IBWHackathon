import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { username,password,email,walletAddress,name,gender,surname } = await req.json();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2FA Secret Key oluşturma
        const secret = speakeasy.generateSecret({ length: 20 });
        let bloggersex;
        // Kullanıcıyı oluşturma
        if(gender == "true")
        {
            bloggersex = true
        }
        else if (gender == "false")
        {
            bloggersex = false
        }
        else{
            return NextResponse.json({ message: 'User not created', }, { status: 509 });
        }
        const user = await prisma.bloggers.create({
            data: {
                username : "wakjd",
                password: hashedPassword,
                email : email,
                walletAddress : walletAddress,
                name : name,
                sex : bloggersex,
                surname : surname,
               
               
                secret: secret.base32 // Secret'ı veritabanına kaydet
            }
        });

       

        // QR Kod oluşturma
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret.ascii,
            label: `BlogChain`,
            issuer: 'TriOLabs',
            encoding: 'ascii'
        });

        const qrCodeDataURL = await qrcode.toDataURL(otpAuthUrl);

        return NextResponse.json({
            message: 'User created, please enable 2FA.',
            qrCodeDataURL
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'User not created', }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
