'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {


    const [ProfileData, setProfileData] = useState('');
    const [HideUnsubscribeBtn, setHideUnsubscribeBtn] = useState(false);
    const [ShowCancelTime, setShowCancelTime] = useState(null);
    const [PlanStatus, setPlanStatus] = useState('');
    const [plan, setPlan] = useState(null)
    // console.log('Value of plastine', PlanStatus)
    useEffect(() => {
        // console.log('Value of PlanStatus:', PlanStatus.plan.canceled_at);
    }, [PlanStatus]);

    //remove
    // console.log('Data stored in plact is', PlanStatus.plan);

    useEffect(() => {
        
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            // const apiUrl = 'https://plurawlapp.com/plurawl/api/users/get_profile';
            let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
            const apiUrl = api + '/api/users/get_profile';
            const profileData = localStorage.getItem('user');
            const P = JSON.parse(profileData);
            console.log("Token ", P.token)
            setPlan(P.user.plan)
            const response = await fetch(apiUrl, {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + P.token,
                    'Content-Type': 'application/json'
                },
                // mode: 'no-cors' // Set the mode to no-cors
            });
            console.log("Get Profile ", response)
            if (response.ok) {
                const DATA = await response.json();
                const Result = DATA.data.plan.plan;
                setPlan(DATA.data.plan)
                const PlanSt = DATA.data;
                console.log('Plan is', PlanSt)
                // if (PlanSt.plan.plan.active === true) {
                if (PlanSt.plan.status === "canceled") {
                    router.push('/home')
                }
                // else if (PlanSt.plan.plan.active === true) {
                if (PlanSt.plan.cancel_at_period_end === true) {
                    console.log("Plan cancels at period end")
                    setPlanStatus()
                    setHideUnsubscribeBtn(true)

                    //pick this code
                    let unix_timestamp = PlanSt.plan.canceled_at; // Time when plan ends Unix timestamp
                    // console.log('Value for time is', unix_timestampa)
                    // console.log('Value i am using is 1716488518')
                    // let unix_timestamp = 1716488518;
                    const date = new Date(unix_timestamp * 1000);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1; // Adding 1 since January is 0
                    const day = date.getDate();
                    const formattedDate = day + '-' + month + '-' + year;


                    // setEndtime(formattedDate)
                    if (PlanSt.plan.remainingDays <= 0) {
                        setShowCancelTime("Plan expired")
                    }
                    else {
                        setShowCancelTime(`${PlanSt.plan.remainingDays} days until subscription expires`);
                    }
                    console.log(formattedDate);
                }
                else{
                    console.log("Plan does not cancel at period end")
                }
                // }


                console.log('Data recieved fron profile api is', Result);
                //remove
                console.log('Plansttsua is', PlanSt.plan.canceled_at)
                setProfileData(Result);
            }
        }
        finally {
            console.log('');
        }
    }

    //code for logout user

    const router = useRouter();
    const handleLogoutClick = () => {
        localStorage.removeItem('user');
        router.push('/');
        console.log('Data is removed');
    }

    //code for Unsubscribe Api

    //store subscription cancel time

    // const [endtime, setEndtime] = useState(null);

    const [loading, setLoading] = useState(false)
    const [SelectedPlanIndexValue, setSelectedPlanIndexValue] = useState('');
    // console.log('Selected plan value is', SelectedPlanIndexValue)

    useEffect(() => {
        let SelectedPlanIndex = null;
        if (ProfileData.amount === 2000) {
            SelectedPlanIndex = '0',
                setSelectedPlanIndexValue(SelectedPlanIndex)
        } else if (ProfileData.amount) {
            SelectedPlanIndex = '1',
                setSelectedPlanIndexValue(SelectedPlanIndex)
        } else if (ProfileData.amount) {
            SelectedPlanIndex = '2',
                setSelectedPlanIndexValue(SelectedPlanIndex)
        }
    })

    const handleUnSubscribe = async () => {
        console.log('Data to send in api', ProfileData.amount)
        try {
            setLoading(true);
            // const apiUrl2 = 'https://plurawlapp.com/plurawl/api/users/cancel_subscription';
            let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
            const apiUrl2 = api + '/api/users/cancel_subscription';
            const USERPROFILEDATA = localStorage.getItem('user');
            const UPD = JSON.parse(USERPROFILEDATA);
            // console.log('Data of localstorage is', UPD.user.plan.canceled_at);
            const response = await fetch(apiUrl2, {
                method: 'post',
                headers: {
                    Authorization: 'Bearer ' + UPD.token,
                    'Content-Type': 'application/json'
                },
                
            });
            if (response.ok) {
                const UNsubscribe = await response.json();
                console.log('Data of un subscription is', UNsubscribe);
                let PlanSt = UNsubscribe.data;
                // Router.push('/home')
                setLoading(false);
                setPlan(PlanSt)
                // getProfile()
                //code for set time

                if (PlanSt.cancel_at_period_end === true) {
                    console.log("Plan cancels at period end")
                    setPlanStatus()
                    setHideUnsubscribeBtn(true)

                    //pick this code
                    let unix_timestamp = PlanSt.canceled_at; // Time when plan ends Unix timestamp
                    // console.log('Value for time is', unix_timestampa)
                    // console.log('Value i am using is 1716488518')
                    // let unix_timestamp = 1716488518;
                    const date = new Date(unix_timestamp * 1000);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1; // Adding 1 since January is 0
                    const day = date.getDate();
                    const formattedDate = day + '-' + month + '-' + year;


                    // setEndtime(formattedDate)
                    if (PlanSt.remainingDays <= 0) {
                        setShowCancelTime("Plan expired")
                    }
                    else {
                        setShowCancelTime(`${PlanSt.remainingDays} days until subscription expires`);
                    }
                    console.log(formattedDate);
                }

            } else {
                console.log('There is some issue')
            }
        } catch (error) {
            console.log('Error is', error)
        }
    }


    const getTrialDays = () => {
        if (plan && plan.trial_end) {
            const trialEndDate = new Date(plan.trial_end * 1000);
            const currentDate = new Date();
            const remainingTrialDays = Math.ceil((trialEndDate - currentDate) / (1000 * 60 * 60 * 24));

            if (remainingTrialDays > 0) {
                console.log(`Trial period is active. Days remaining: ${remainingTrialDays}`);
                return remainingTrialDays
            } else {
                console.log('Trial period has ended.');
                return 0
            }
        } else {
            console.log('No trial period.');
            return 0
        }
    }
    const getPlanCurrentChargePrice = () => {
        console.log('Price finding', plan)

        if (plan) {
            console.log('There is a plan')
            if (plan.status === 'trialing' || plan.trialStatus === "trialing") {
                console.log('On Trial')
                let days = getTrialDays()
                return `Trial: (${days} ${days > 1 ? "days" : "day"} remaining)`
            }
            else if (plan.discount) {
                console.log('There is discount')
                const { coupon, start, end } = plan.discount;

                console.log(`Coupon ID: ${coupon.id}`);
                console.log(`Coupon Duration: ${coupon.duration}`);
                console.log(`Coupon Duration In Months: ${coupon.duration_in_months}`);
                console.log(`Coupon Valid From: ${new Date(start * 1000).toISOString()}`);
                console.log(`Coupon Valid To: ${end ? new Date(end * 1000).toISOString() : 'Still active'}`);

                if (coupon.duration === 'repeating' && coupon.duration_in_months) {
                    console.log(`Coupon is valid for ${coupon.duration_in_months} months.`);
                } else if (coupon.duration === 'forever') {
                    console.log('Coupon is valid forever.');
                } else if (coupon.duration === 'once') {
                    console.log('Coupon was applied once.');
                }

                if (end && end < Math.floor(Date.now() / 1000)) {
                    console.log('The discount has expired.');
                    let planAmount = plan.plan.amount / 100;
                    return `$${planAmount}`;
                } else {
                    console.log('The discount is still valid.');
                    let off = plan.discount.coupon.percent_off;
                    let planAmount = plan.plan.amount / 100;
                    let amountOff = planAmount * (off / 100);
                    let chargeAmount = planAmount - amountOff;
                    return `$${chargeAmount}`;
                }

            }
            else {
                let planAmount = plan.plan.amount / 100;
                return `$${planAmount}`;
            }
        }
        else {
            console.log('There is no plan')
            return "$0.00"
        }
    }

    // code for time converter
    // const timeConverter = () => {
    //     let unix_timestamp = 1549312452; // Example Unix timestamp
    //     var date = new Date(unix_timestamp * 1000);
    //     var year = date.getFullYear();
    //     var month = date.getMonth() + 1; // Adding 1 since January is 0
    //     var day = date.getDate();
    //     var formattedDate = day + '-' + month + '-' + year;

    //code for showing the time interval

    const [intervalTime, setIntervalTime] = useState(null)

    const getPlanInterval = () => {
        if (plan) {
            // console.log("Plan is")
            if (plan.plan.interval_count === 1 && plan.plan.interval === 'month') {

                return 'Monthly'

            } else if (plan.plan.interval_count === 6 && plan.plan.interval === "month") {
                return '6 Monthly'

            }
            else if (plan.plan.interval_count === 1 && plan.plan.interval === "year") {
                return 'Yearly'

            }
        }
        else{
            return "Loading plan"
        }

    }

    useEffect(() => {
        if (intervalTime !== null) {
            console.log('Interval time is:', intervalTime);
        }
    }, [intervalTime]);
    return (
        <div className="w-full" style={{ backgroundColor: 'white', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className='flex flex-row w-full h-5 justify-end mt-6'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div />
                    <p className='font-semibold text-2xl'>
                    </p>
                    <button onClick={handleLogoutClick} style={{
                        backgroundColor: '#ffffff70', padding: 12, borderRadius: 10,
                        fontWeight: 'bold'
                    }}>
                        Log out
                    </button>
                </div>
            </div>

            <div style={{ width: '100vw', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>

                <div style={{ fontWeight: 'bold', fontSize: 28, marginTop: 30 }}>
                    Thanks for Subscribing
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src='/assets/complete.png' alt='Complete' style={{ height: 'auto', width: '100%', maxWidth: '200px' }} />
                </div>
                <div>
                    <div style={{ color: '', marginTop: 10, display: 'flex' }}>
                        <span className='font-bold'>Plan :</span>
                        <span style={{ color: 'red', marginLeft: 10 }}>
                            {getPlanInterval()}
                        </span>
                        {/*<span style={{ color: 'red', marginLeft: 10 }}>
                            {ProfileData.interval === "year" && ProfileData.interval_count === "1" ? <div>Yearly</div> : <div></div>}
                        </span>
                        <span style={{ color: '', marginLeft: 10 }}>
                            {ProfileData.interval === "halfyear" && ProfileData.interval_count === "6" ? <div>Half Yearly</div> : <div></div>}
                        </span>
                        <span style={{ color: '', marginLeft: 10 }}>
                            {ProfileData.interval === "month" && ProfileData.interval_count === "1" ? <div>Monthly</div> : <div></div>}
    </span>*/}
                    </div>
                    <div style={{ color: '', marginTop: 10, display: 'flex' }}>
                        <span className='font-bold'>Cost :</span> <span style={{ color: 'red', marginLeft: 10 }}>{getPlanCurrentChargePrice()}</span>
                    </div>
                </div>
                {/*<div style={{ color: 'white', fontWeight: '' }}>
                    <span style={{ color: 'white', fontWeight: 'bolder' }}>End time is</span> {endtime ? endtime : ''}
    </div>*/}

                <div>
                    {
                        HideUnsubscribeBtn ? ShowCancelTime :
                            <button onClick={handleUnSubscribe} style={{ backgroundColor: '#D44740', color: 'white', padding: 12, borderRadius: 10, fontSize: '16px' }}>
                                {loading ? 'Loading' : 'Cancel subscription'}
                            </button>
                    }
                </div>
            </div>
            <div className='h-5'>

            </div>
        </div>
    )
}

export default Page
