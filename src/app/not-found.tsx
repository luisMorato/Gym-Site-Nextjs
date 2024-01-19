'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Styles from '@/app/styles/NotFound/NotFound.module.css';
 
export default function NotFound() {
  const [count, setCount] = useState<number>(10);
  const router = useRouter();

  const countDown = () => {
    setCount(prevCount => (prevCount === 0 ? 0 : prevCount - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      countDown();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (count === 0) {
      router.push('/');
    }
  }, [count, router]);
  
  return (
    <div className={Styles.notFound}>
      <h1 className='text-[164px] font-bold text-center'>404</h1>
      <h2 className='text-[32px] font-bold'>Page Not Found</h2>
      <p className='text-zinc-300 m-4 text-lg'>This page is currently under maintenance and will guide back to the homepage after <b className='text-red-600'>{count}</b> seconds.</p>
      <br />
      <Link href="/"><button>Return Home</button></Link>
    </div>
  )
}