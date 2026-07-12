import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get('token');

    if (!token) {
      toast.error('Google sign-in failed. Please try again.');
      navigate('/login', { replace: true });
      return;
    }

    (async () => {
      try {
        const user = await loginWithToken(token);
        toast.success(`Welcome, ${user.name.split(' ')[0]}!`);
        const destination = user.role === 'admin' ? '/admin' : user.role === 'owner' ? '/owner' : '/';
        navigate(destination, { replace: true });
      } catch (err) {
        toast.error('Could not complete Google sign-in. Please try again.');
        navigate('/login', { replace: true });
      }
    })();
  }, [searchParams, loginWithToken, navigate]);

  return <Loader fullScreen label="Finishing Google sign-in..." />;
};

export default OAuthCallback;
