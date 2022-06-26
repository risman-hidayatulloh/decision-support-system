import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect = () => {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const { type } = session;
      if (type === 'lecturer') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    }
  }, [session]);

  return <>Please wait..</>;
};

export default Redirect;
