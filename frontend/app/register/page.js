'use client';

import RegisterForm from '@/components/RegisterForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterPage() {

    const router = useRouter();

      useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

        const token = localStorage.getItem('token');
        if (token) {
          router.replace('/dashboard');

        }
      }, [router]);
  return <RegisterForm />;
}