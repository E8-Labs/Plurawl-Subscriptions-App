'use client'
import { useRouter } from 'next/navigation'
import { React, useState, useEffect, Suspense } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Result } from 'postcss';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

//pk_test_51JfmvpC2y2Wr4BecD5qeIqkwOaNCMScIgL6TdhNQNoFdNkMbqKhSn3xjrC5K9X483QuMApm7h8uAnjcDW7XMqHmy00vHYLByuW
let stripePublickKey = process.env.REACT_APP_ENVIRONMENT === "Production" ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripePublickKey);

const Page = () => {

  const router = useRouter()

  //code to call login api

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const [snackMessage, setSnackMessage] = useState(false);
  const [OpnReject, setOpenReject] = useState(false)

  const handleSigninclick = async (event) => {
    event.preventDefault();
    try {
      setloading(true)
      const api = 'https://plurawlapp.com/plurawl/api/users/login';
      const response = await fetch(api, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        let data = await response.json();
        console.log('Data recieved form api is', data);
        if (data.status === true) {
          localStorage.setItem('user',
            JSON.stringify(data.data),
            console.log("Data stored on local storage is", data.data)
          )
          router.push('/home')
        } else {
          console.log('Couldnot login bcz', data.message)
          setError(true)
          setSnackMessage(data.message)
        }
      } else if (!response.ok) {
        console.log('Api is not called')
      }

    } catch (error) {
      console.log('Error occured while loging in is', error)
    }
    finally {
      setloading(false)
    }
  }

  //code for getting data from local storage
  const handleClose1 = () => {
    setError(false)
  }
  useEffect(() => {
    const userData = () => {
      const Data = localStorage.getItem('user');
      const ProfileData = JSON.parse(Data);
      console.log('Data recieved from local storage in status is', ProfileData);
      if (ProfileData) {
        const Status = ProfileData.user.plan.plan;
        if (Status.active === true) {
          router.replace('/home/cards/subscriptioncompleted')
        }
      } else {
        console.log('Usernot loged in')
      }
    }
    userData();
  }, []);

  return (
    // <Suspense>
      <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '350px', gap: 150, display: 'flex', flexDirection: 'column' }}>
          <div className="text-lg	font-semibold" style={{ color: 'white', marginTop: 20 }}>
            Enter email and password
          </div>
          <Snackbar
            open={error}
            autoHideDuration={5000}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: 'left'
            }}
          >
            <Alert onClose={handleClose1} severity="success" sx={{ width: '50%' }}>
              {snackMessage}
            </Alert>
          </Snackbar>
          <div>
            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <input onChange={(e) => setEmail(e.target.value)} className='w-5/6 font-semibold' style={{ outline: 'none', padding: '15px', borderRadius: 10 }} type="email" placeholder="Enter Email" />
              <input onChange={(e) => setPassword(e.target.value)} className='w-5/6 mt-4 font-semibold' style={{ outline: 'none', padding: '15px', borderRadius: 10 }} type="password" placeholder="Enter Password" />
              <div>
              </div>
              <div>
                <button className='font-semibold' onClick={handleSigninclick} style={{ color: 'white', backgroundColor: 'red', height: '50px', width: '100px', borderRadius: 5, marginTop: 30 }}>
                  {loading ? <div style={{ height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress sx={{ height: '30px' }} /></div> : 'Sign in'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    // </Suspense>
  )
}

export default Page
