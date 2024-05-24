'use client'
import { Button, ButtonBase } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Page = () => {

    const [DataPassed, setDataPassed] = useState('')
    const [PromoCode, setPromoCode] = useState(null)
    console.log('Promocode is', PromoCode)

    //code to navigate back
    const router = useRouter();
    const handleBackIcon = () => {
        router.back('')
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
            // setLoading(true);
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
                console.log('Data of subscribe api is', DATA.data.data[0].plan)
                if (DATA.data.data[0].plan.active === true) {
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
            // setLoading(false);
        }
    }

    //handle subscription when promo code is added

    const handleContinueClick = async (event) => {
        try {
            // setLoading(true);
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
                if (DATA.data.data[0].plan.active === true) {
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
            // setLoading(false);
        }
    }


    return (
        <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '350px', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
                    <div style={{ height: '40px', width: '40px', backgroundColor: '#ffffff80', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button onClick={handleBackIcon}>
                            <img src='/assets/backicon2.png' style={{ height: '25px', width: '30px' }} alt='backicon' />
                        </button>
                    </div>
                    <div>
                        <ButtonBase onClick={handleSkipClick} variant="outlined" style={{ color: '#E01F1F' }}>
                            Skip
                        </ButtonBase>
                    </div>
                </div>
                <div style={{ fontWeight: '500', fontSize: 24, marginTop: 40 }}>
                    Add Your Promo Code
                </div>
                <div>
                    <input onChange={(e) => setPromoCode(e.target.value)} type='text' className='w-full font-semibold' style={{ outline: 'none', padding: '15px', borderRadius: 10, color: '#333333', marginTop: 50 }}
                        placeholder="Enter Promo Code" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                    <Button onClick={handleContinueClick} variant="outlined" style={{ color: 'white', backgroundColor: 'grey' }}>
                        Subscribe Plan
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page
