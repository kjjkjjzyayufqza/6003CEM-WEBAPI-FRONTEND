'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScroll from '@/lib/hooks/use-scroll';
import { useSignInModal } from './sign-in-modal';
import UserDropdown from './user-dropdown';
import { Session } from 'next-auth';
import { useEffect } from 'react';

export default function NavBar ({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  useEffect(() => {
    // console.log(session)
  }, []);
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl'
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className='mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto'>
          <Link href='/' className='font-display flex items-center text-2xl'>
            <Image
              src='/logo.png'
              alt='Precedent logo'
              width='30'
              height='30'
              className='mr-2 rounded-sm'
            ></Image>
            <p>The Pet Shelter</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className='rounded-full border border-white bg-[#facc15] p-2 px-4 text-sm text-white transition-all hover:bg-yellow-600 hover:text-white'
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
