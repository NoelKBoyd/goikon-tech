'use client';
import TopNav from './Components/TopNav';
import { useState } from 'react';
import Link from 'next/link';
import jwt from 'jsonwebtoken';

export default function Homepage() {
    return (
      <main>
          <TopNav/> 
      </main>
    );
}