'use client';
import TopNav from './Components/AdminNav';
import HomeNav from './Components/HomeNav';
import { useState } from 'react';
import Link from 'next/link';
import jwt from 'jsonwebtoken';

export default function Homepage() {
    return (
      <main>
          <HomeNav/> 
      </main>
    );
}