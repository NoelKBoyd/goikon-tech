import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error('Invalid JSON input:', error);
        return NextResponse.json({ message: 'Invalid JSON input' }, { status: 400 });
    }

    const { email, password, name } = body;

    if (!email || !password || !name) {
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

        // Assign default role (assuming 'user' is roleId = 2)
        const defaultRole = await prisma.userRole.findFirst({
            where: { name: 'user' }
        });

        if (!defaultRole) {
            return NextResponse.json({ message: 'Default role not found' }, { status: 500 });
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                roleId: defaultRole.id
            },
        });

        return NextResponse.json({ message: 'Registration successful', userId: user.id }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
    }
}
