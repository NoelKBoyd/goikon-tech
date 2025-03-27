import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, password: true, roleId: true } // Only fetch necessary fields
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, roleId: user.roleId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ 
            message: 'Login successful', 
            token, 
            roleId: user.roleId // Include roleId in the response
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error logging in', error: error.message }, { status: 500 });
    }
}
