'use client'
import { Button, ButtonBase } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';

const Page = () => {

    const [DataPassed, setDataPassed] = useState('');
    const [PromoCode, setPromoCode] = useState('');
    const [loading, setloading] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [promoCodeError, setPromoCodeError] = useState(null);

    const timerRef = useRef(null);
    // console.log('Promocode is', PromoCode);

    //code to navigate back
    const router = useRouter();
    const handleBackIcon = () => {
        router.back('')
    }

    console.log('Promo code is:', PromoCode);

    //code to close snakbar
    const handleClose = () => {
        setError(false)
    }

    useEffect(() => {
        let data = localStorage.getItem('plan')

        if (data) {
            let p = JSON.parse(data);
            console.log("Card selected is ", p.selectedCard)
            setDataPassed(p)
            // setPlan(p)
        }
        else {
            console.log("No data found")
        }
    }, []);

    //handle subscription when user donot add promocode

    const handleSkipClick = async (event) => {
        try {
            setLoading(true);
            event.preventDefault();
            // const apiUrl = 'https://plurawlapp.com/plurawl/api/users/subscribe';
            let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
            const apiUrl = api + '/api/users/subscribe';
            const userDeatils2 = localStorage.getItem('user');
            const S = JSON.parse(userDeatils2);
            const response = await fetch(apiUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + S.token
                },
                body: JSON.stringify({ 'sub_type': DataPassed.planIndex })
            });
            if (response.ok) {
                const subscription = await response.json();
                const DATA = subscription;
                console.log('Data of subscribe api is', DATA.data.plan)
                if (DATA.data.plan.active === true) {
                    console.log('Plan is true')
                    router.push('/home/cards/Promo/subscriptioncompleted')
                    // Router.push(`/home/subscriptioncompleted?selectedPlanIndex=${selectedPlanIndex2}`)
                    // console.log('Data sent to finalscreen is', selectedPlanIndex2)
                } else {
                    console.log('Caannot console error')
                }
            } else {
                console.log('Unknown error occured')
            }
        } catch (error) {
            console.log('Error is', error)
        } finally {
            setLoading(false);
        }
    }
    //loading should be false when loaded

    //handle subscription when promo code is added

    const handleContinueClick = async (event) => {
        if (PromoCode.length === 0 || promoCodeError) {
            setloading(false);
            setError(true)
        } else {
            try {
                setloading(true);
                event.preventDefault();
                // const apiUrl = 'https://plurawlapp.com/plurawl/api/users/subscribe';
                let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
                const apiUrl = api + '/api/users/subscribe';
                const userDeatils2 = localStorage.getItem('user');
                const S = JSON.parse(userDeatils2);
                const response = await fetch(apiUrl, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + S.token
                    },
                    body: JSON.stringify({ 'sub_type': DataPassed.planIndex, "code": PromoCode })
                });
                if (response.ok) {
                    const subscription = await response.json();
                    const DATA = subscription;
                    console.log('Data of subscribe api is', DATA)
                    if (DATA.data.plan.active === true) {
                        console.log('Plan is true')
                        router.push('/home/cards/Promo/subscriptioncompleted')
                        // Router.push(`/home/subscriptioncompleted?selectedPlanIndex=${selectedPlanIndex2}`)
                        // console.log('Data sent to finalscreen is', selectedPlanIndex2)
                    } else {
                        console.log('Caannot console error')
                    }
                } else {
                    console.log('Unknown error occured')
                }
            } catch (error) {
                console.log('Error is', error)
            } finally {
                setloading(false);
            }
        }
    }

    //code for checking that promocode is valid or not

    const getPromocodeAvailable = async () => {
        try {
            const userDeatils2 = localStorage.getItem('user');
            const T = JSON.parse(userDeatils2);
            const ApiUrl = `https://plurawlapp.com/plurawl/api/users/is_coupon_valid?coupon=${PromoCode}`;
            console.log("Promo api ", ApiUrl)
            const response = await fetch(ApiUrl, {
                method: 'post',
                
            });
            console.log('Response of api is :', response);
            if (response.ok) {
                const result = await response.json();
                if (result.status === true) {
                    console.log('Promocode is :', result.message);
                    setPromoCodeError(false);
                } else if (result.status === false) {
                    console.log('Promocde is :', result.message);
                    setPromoCodeError(true);
                } else {
                    console.log('There is some error');
                }
            } else {
                console.log('Response of api is not correct');
            }
        } catch (error) {
            console.log('Error ocured while calling api is:', error);
        }
    }

    useEffect(() => {
        // Clear the previous timer if PromoCode changes
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set a new timer
        timerRef.current = setTimeout(() => {
            console.log('Timeout for promocode is triggering');
            if (PromoCode !== "") {
                getPromocodeAvailable();
            }
        }, 500);

        // Clean up the timer when the component unmounts
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [PromoCode]);

    return (
        <div className="w-full" style={{ backgroundColor: '#00000030', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '350px', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
                    <div style={{ height: '40px', width: '40px', backgroundColor: '#00000000', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button onClick={handleBackIcon}>
                            <img src='/assets/backicon2.png' alt='backicon' />
                        </button>
                    </div>
                    <div>

                        <ButtonBase onClick={handleSkipClick} variant="outlined" style={{ color: '#E01F1F' }}>
                            {
                                Loading ?
                                    <div style={{ height: '20px', width: '20px' }}>
                                        <CircularProgress color='inherit' />
                                    </div> :
                                    'Skip'
                            }
                        </ButtonBase>

                    </div>
                </div>
                <div style={{ fontWeight: '500', fontSize: 24, marginTop: 40 }}>
                    Add Your Promo Code :
                </div>
                <div>
                    <input
                        onChange={(e) => setPromoCode(e.target.value)}
                        type='text' className='w-full font-semibold'
                        style={{ outline: 'none', padding: '15px', borderRadius: 10, color: '#333333', marginTop: 50 }}
                        placeholder="Enter Promo Code" />
                </div>
                <div>
                {/* {
                    promoCodeError === false && 
                    <div className='font-medium text-xl' style={{color: 'green'}}>
                        PromoCode is valid
                    </div>
                } */}
                {
                    promoCodeError === true && 
                    <div className='pt-2' style={{color: 'red', fontSize: 11}}>
                        Invalid coupon code
                    </div>
                }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                    {loading ?
                        <div style={{ height: '20px', width: '20px' }}>
                            <CircularProgress color='inherit' />
                        </div> :
                        <Button onClick={handleContinueClick} variant="outlined" style={{ color: 'white', backgroundColor: '#D44740', fontSize: 'larger', padding: 10, borderRadius: 10 }}>
                            Subscribe Plan
                        </Button>
                    }
                </div>
                <Snackbar
                    open={error}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                    TransitionProps={{
                        direction: 'left'
                    }}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Add PromoCode for further processing
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default Page
