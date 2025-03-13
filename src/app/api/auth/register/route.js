import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure the path is correct



export async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error('Invalid JSON input:', error);
        return NextResponse.json({ message: 'Invalid JSON input' }, { status: 400 });
    }

    const { email, password, name, phone, role, dob } = body;

    if (!email || !password || !name || !phone || !role || !dob) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
        }

        const validRole = await prisma.userRole.findFirst({
            where: { name: role } // Use the role provided by the user
        });
        
        if (!validRole) {
            return NextResponse.json({ message: 'Invalid role specified' }, { status: 400 });
        }
        

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                dateOfBirth: new Date(dob),
                roleId: validRole.id
            },
        });

        return NextResponse.json({ message: 'Registration successful', userId: user.id }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
    }
}
