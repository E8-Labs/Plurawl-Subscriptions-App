'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { React, useState, useEffect, Suspense } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import axios from 'axios';

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [WebCodeError, setWebCodeError] = useState(false);
  const [WebCodeResponse, setWebCodeResponse] = useState('');
  const [WebCodeLoading, setWebCodeLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState(false);

  useEffect(() => {
    const handleUrlCode = async () => {
      const code = searchParams.get("code");
      console.log("Code is ", code);
      try {
        setWebCodeLoading(true);
        const apiUrl = "https://plurawlapp.com/plurawl/api/users/verify_web_token";
        const response = await fetch(apiUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: code })
        });
        if (response.ok) {
          let Result = await response.json();
          console.log('Response is', Result);
          const data = Result;
          setWebCodeResponse(data);
          if (data.status === true) {
            localStorage.setItem('user', JSON.stringify(data.data));
            
            let plan = data.data.user.plan;
            if (plan !== null && plan.status === "active") {
              router.push('/home/cards/Promo/subscriptioncompleted')
            }
            else {
              router.push('/home')
            }
          } else {
            setWebCodeError(true)
            console.log('Web code err')
          }
        }
      } catch (error) {
        console.log('Error is', error)
      } finally {
        setWebCodeLoading(false)
      }
    }
    handleUrlCode();
  }, []);

  const handleSigninclick = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const api = "https://plurawlapp.com/plurawl/api/users/login";
      const response = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        let data = await response.json();
        console.log('Data received from API is', data);
        if (data.status === true) {
          localStorage.setItem('user', JSON.stringify(data.data));
          let plan = data.data.user.plan;
          if (plan !== null && plan.status === "active") {
            router.push('/home/cards/Promo/subscriptioncompleted');
          } else {
            router.push('/home');
          }
        } else {
          console.log('Could not login because', data.message);
          setError(true);
          setSnackMessage(data.message);
        }
      } else {
        console.log('API call failed');
      }
    } catch (error) {
      console.log('Error occurred while logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      {
        WebCodeLoading ?
          <div style={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
            <p style={{ color: 'white' }}>Authenticating user</p>
            <CircularProgress sx={{ height: '30px' }} />
          </div> :
          <div style={{ width: '100vw', gap: 150, display: 'flex', flexDirection: 'column', }}>

            <Snackbar
              open={WebCodeError}
              autoHideDuration={2000}
              onClose={() => setWebCodeError(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              TransitionComponent={Slide}
              TransitionProps={{
                direction: 'left'
              }}
            >
              <Alert onClose={() => setWebCodeError(false)} severity="error" sx={{ width: '100%' }}>
                {WebCodeResponse.message} <p>Login in with Email</p>
              </Alert>
            </Snackbar>

            <div className="text-lg font-semibold flex justify-center " style={{ color: 'white', marginTop: 20, backgroundColor: 'transparent' }}>
              Login
            </div>
            <Snackbar
              open={error}
              autoHideDuration={5000}
              onClose={() => setError(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              TransitionComponent={Slide}
              TransitionProps={{
                direction: 'left'
              }}
            >
              <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
                {snackMessage}
              </Alert>
            </Snackbar>
            <div>
              <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <input onChange={(e) => setEmail(e.target.value)} className='w-5/6 font-semibold' style={{ outline: 'none', padding: '15px', borderRadius: 10 }} type="email" placeholder="Enter Email" />
                <input onChange={(e) => setPassword(e.target.value)} className='w-5/6 mt-4 font-semibold' style={{ outline: 'none', padding: '15px', borderRadius: 10 }} type="password" placeholder="Enter Password" />
                <div>
                  <button className='font-semibold' onClick={handleSigninclick} style={{ color: 'white', backgroundColor: 'red', height: '50px', width: '100px', borderRadius: 5, marginTop: 30 }}>
                    {loading ? <div style={{ height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress sx={{ height: '30px' }} /></div> : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
      }
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
