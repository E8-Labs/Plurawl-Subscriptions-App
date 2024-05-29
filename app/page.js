'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { React, useState, useEffect, Suspense } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert, Button } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Result } from 'postcss';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

//pk_test_51JfmvpC2y2Wr4BecD5qeIqkwOaNCMScIgL6TdhNQNoFdNkMbqKhSn3xjrC5K9X483QuMApm7h8uAnjcDW7XMqHmy00vHYLByuW
// let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY
// const stripePromise = loadStripe(stripePublickKey);

const Page = () => {

  const router = useRouter()

  const searchParams = useSearchParams();
  const [WebCodeError, setWebCodeError] = useState(false)
  const [WebCodeResponse, setWebCodeResponse] = useState('')
  const [WebCodeLoading, setWebCodeLoading] = useState(false)

  useEffect(() => {
    const handleUrlCode = async () => {
      const code = searchParams.get("code");
      console.log("Code is ", code);
      try {
        setWebCodeLoading(true);
        // const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app/api/users/verify_web_token" : "https://plurawlapp.com/plurawl/api/users/verify_web_token"
        const apiUrl = "https://plurawlapp.com/plurawl/api/users/verify_web_token";
        // const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMjUsIm5hbWUiOiJUcnVtcDEiLCJlbWFpbCI6InRydW1wMUBwbHVyYXdsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJElQVDBQOGtLWUE3a2V5d3hGdkcybE9HNmdTOUdrQi42dU5tT21jY29YS2cuamlyTUFRc3l5IiwicHJvZmlsZV9pbWFnZSI6IiIsImNvbXBhbnkiOm51bGwsInRpdGxlIjpudWxsLCJpbmR1c3RyeSI6bnVsbCwiY2l0eSI6bnVsbCwic3RhdGUiOm51bGwsImdlbmRlciI6bnVsbCwicmFjZSI6bnVsbCwibGdidHEiOm51bGwsInZldGVyYW4iOm51bGwsImZjbV90b2tlbiI6bnVsbCwiZGV2aWNlX2lkIjoiIiwicHJvdmlkZXJfaWQiOiIiLCJwcm92aWRlcl9uYW1lIjoiRW1haWwiLCJyb2xlIjoidXNlciIsInBvaW50cyI6MCwiZW5jX2tleSI6bnVsbCwiZW5jX2l2IjpudWxsLCJjb3VudHJpZXMiOm51bGwsInByb25vdW5zIjpudWxsLCJkb2IiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDZUMTU6NTc6MTYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDZUMTU6NTc6MTYuMDAwWiJ9LCJpYXQiOjE3MTY5NjQ0MzEsImV4cCI6MTc0ODUwMDQzMX0.tqY_xAviMcS2uTCrYWTfPoueOraL9UPYPDWD_gTMa_E"
        const response = await fetch(apiUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + d.token
          },

          body: JSON.stringify({ code: code })
        });
        if (response.ok) {
          let Result = await response.json();
          console.log('Response is', Result)
          const data = Result;
          setWebCodeResponse(data);
          if (data.status === true) {
            // localStorage.setItem('user',
            //   JSON.stringify(data.data)
            // )
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
  }, [])

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
      const api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app/api/users/login" : "https://plurawlapp.com/plurawl/api/users/login";
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
            JSON.stringify(data.data)
          )
          let plan = data.data.user.plan;
          if (plan !== null && plan.status === "active") {
            router.push('/home/cards/Promo/subscriptioncompleted')
          }
          else {
            router.push('/home')
          }

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
    try {
      // setCardLoading(true)
      // const apiUrl = 'https://plurawlapp.com/plurawl/api/users/get_profile';
      const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app/api/users/get_profile" : "https://plurawlapp.com/plurawl/api/users/get_profile";
      const data = localStorage.getItem('user');
      const d = JSON.parse(data);
      const response = await fetch(apiUrl, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + d.token
        }
      })
      console.log('Token recieved is', d.token)

      if (response.ok) {
        const cards = await response.json();
        console.log('Data of user is', cards)
        if (cards.status === true) {
          let p = cards.data;
          d.user = p;
          localStorage.setItem("user", JSON.stringify(d))
          if (p.plan !== null) {
            const status = p.plan.status;
            if (status === "active") {
              router.replace('/home/cards/Promo/subscriptioncompleted')
            }
            else {
              router.replace('/home')
            }
          }
          else {
            router.replace('/home')
          }
        } else {

        }
      } else {
        console.log('Error', response)
      }
    } catch (error) {
      console.log('Error occured is', error)
    } finally {
      // setCardLoading(false);
    }
  }

  //code for description screen
  const handleDescriptionClick = () => {
    router.push('/AddDescription')
    console.log('Btn is working')
  }

  //code for getting data from local storage
  const handleClose1 = () => {
    setError(false);
    setWebCodeError(false);
  }
  useEffect(() => {

    const getProfile = async () => {
      try {
        // setCardLoading(true)
        // const apiUrl = 'https://plurawlapp.com/plurawl/api/users/get_profile';
        const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app/api/users/get_profile" : "https://plurawlapp.com/plurawl/api/users/get_profile";
        const data = localStorage.getItem('user')
        const d = JSON.parse(data);
        const response = await fetch(apiUrl, {
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + d.token
          }
        })
        console.log('Token recieved is', d.token)

        if (response.ok) {
          const cards = await response.json();
          console.log('Data of user is', cards);
          if (cards.status === true) {
            let p = cards.data;
            d.user = p;
            localStorage.setItem("user", JSON.stringify(d))
            if (p.plan !== null) {
              const status = p.plan.plan.active;
              if (status) {
                router.replace('/home/cards/Promo/subscriptioncompleted')
              }
              else {
                router.replace('/home')
              }
            }
            else {
              router.replace('/home')
            }
          } else {
            console.log('')
          }
        } else {
          console.log('Error', response)
        }
      } catch (error) {
        console.log('Error occured is', error)
      } finally {
        // setCardLoading(false);
      }
    }
    const userData = () => {
      const Data = localStorage.getItem('user');
      const ProfileData = JSON.parse(Data);
      console.log('Data recieved from local storage in status is', ProfileData);

      if (ProfileData) {
        // const Status = ProfileData.user.plan.plan;
        // if (Status.active === true) {
        getProfile()

        // }
      } else {
        console.log('Usernot loged in')
      }
    }
    userData();
  }, []);

  return (
    // <Suspense>
    <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      {
        WebCodeLoading ?
          <div style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%' }}>
            <CircularProgress sx={{ height: '30px' }} />
          </div> :
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

            <Snackbar
              open={WebCodeError}
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
              <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                {WebCodeResponse.message} <p>Login in with Email</p>
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
              <div style={{ justifyContent: 'center', marginTop: 40, display: 'flex' }}>
                <Button variant='contained' onClick={handleDescriptionClick}>
                  Add Description
                </Button>
              </div>
            </div>

          </div>
      }
    </div>
    // </Suspense>
  )
}

export default Page
