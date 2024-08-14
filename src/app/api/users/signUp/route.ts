import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { randomBytes } from 'ethers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    let { password,email,walletAddress,address,birthday,name,gender,surname } = await req.json();
    console.log(gender)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2FA Secret Key oluşturma
        const secret = speakeasy.generateSecret({ length: 20 });
        const date = new Date(birthday);
        const newBirthday = date.toISOString()
        if(gender == "true"){
            gender = true}
        else if (gender == 'false')
        {
            gender = false
        }
       
        // Kullanıcıyı oluşturma
        const user = await prisma.users.create({
            data: {
                username : "K0twHan",
                password: hashedPassword,
                email : email,
                walletAddress : walletAddress,
                address : address,
                birthday : newBirthday,
                name : name,
                sex : gender,
                surname : surname,
               
               
                secret: secret.base32 // Secret'ı veritabanına kaydet
            }
        });



        



       

        // QR Kod oluşturma
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: secret.ascii,
            label: `Blog App (${user.name})`,
            issuer: 'Blog App',
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
