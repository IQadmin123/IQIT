import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function setItem(key, value) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  
  export function getItem(key) {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }

  export const useAuth = () => {
    const router = useRouter();  
    useEffect(() => {
      const token = localStorage.getItem('token');  
      if (!token) {
        // window.location.href = '/login'
        router.push('/login')
      }
    }, []);
  
    return null;
  };