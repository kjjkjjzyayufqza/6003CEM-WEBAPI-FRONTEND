'use client'
import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession(authOptions);
      setSession(sessionData);
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 或者你可以返回一个更复杂的加载状态
  }

  return <Navbar session={session} />;
}