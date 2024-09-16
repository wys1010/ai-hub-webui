'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (session) {
    return (
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='flex items-center space-x-2 focus:outline-none'
          type='button'
        >
          {session.user?.image && (
            <Image src={session.user.image} alt='用户头像' width={32} height={32} className='rounded-full' />
          )}
          <span>{session.user?.name}</span>
        </button>
        {dropdownOpen && (
          <div className='absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg'>
            <button
              onClick={() => signOut()}
              className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
              type='button'
            >
              logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      type='button'
    >
      Login with Google
    </button>
  );
}
