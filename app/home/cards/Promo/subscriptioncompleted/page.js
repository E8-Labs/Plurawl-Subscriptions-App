'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Page = () => {


    const [ProfileData, setProfileData] = useState('');
    const [HideUnsubscribeBtn, setHideUnsubscribeBtn] = useState(false);
    const [ShowCancelTime, setShowCancelTime] = useState(null);
    const [PlanStatus, setPlanStatus] = useState('');
    // console.log('Value of plastine', PlanStatus)
    useEffect(() => {
        // console.log('Value of PlanStatus:', PlanStatus.plan.canceled_at);
    }, [PlanStatus]);

    //remove
    // console.log('Data stored in plact is', PlanStatus.plan);

    useEffect(() => {
        const getProfile = async () => {
            try {
                // const apiUrl = 'https://plurawlapp.com/plurawl/api/users/get_profile';
                let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
            const apiUrl = api + '/api/users/get_profile';
                const profileData = localStorage.getItem('user');
                const P = JSON.parse(profileData);
                const response = await fetch(apiUrl, {
                    method: 'post',
                    headers: {
                        Authorization: 'Bearer ' + P.token,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const DATA = await response.json();
                    const Result = DATA.data.plan.plan;
                    const PlanSt = DATA.data
                    if (PlanSt.plan.plan.active === true) {
                        if (PlanSt.plan.status === "canceled") {
                            setHideUnsubscribeBtn(true)
                        }
                    } else {
                        console.log('error')
                    }
                    console.log('Data recieved fron profile api is', Result);
                    //remove
                    console.log('Plansttsua is', PlanSt.plan.canceled_at)
                    setProfileData(Result);
                    setPlanStatus(PlanSt.plan.canceled_at)
                }
            }
            finally {
                console.log('');
            }
        }
        getProfile();
    }, []);

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
    console.log('Selected plan value is', SelectedPlanIndexValue)

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
            let api = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl";
            const apiUrl2 = api + '/api/users/cancel_subscription';
            const USERPROFILEDATA = localStorage.getItem('user');
            const UPD = JSON.parse(USERPROFILEDATA);
            console.log('Data of localstorage is', UPD.user.plan.canceled_at);
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
                // Router.push('/home')

                //code for set time
                // let unix_timestamp = D.user.plan.canceled_at; // Example Unix timestamp
                // var date = new Date(unix_timestamp * 1000);
                // var year = date.getFullYear();
                // var month = date.getMonth() + 1; // Adding 1 since January is 0
                // var day = date.getDate();
                // var formattedDate = day + '-' + month + '-' + year;
                // // setEndtime(formattedDate)
                // console.log(formattedDate);

            } else {
                console.log('There is some issue')
            }
        } catch (error) {
            console.log('Error is', error)
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

    useEffect(() => {
        // console.log('Data from localstorage to check cancellation  plan is', D.user.plan)
        const timeConverter = () => {
            let unix_timestamp = PlanStatus; // Example Unix timestamp
            // let unix_timestamp = 1715850190;
            var date = new Date(unix_timestamp * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1; // Adding 1 since January is 0
            var day = date.getDate();
            var formattedDate = day + '-' + month + '-' + year;
            // setEndtime(formattedDate)
            setShowCancelTime(formattedDate);
            console.log(formattedDate);
        };
        timeConverter();
    }, []);

    return (
        <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>


            <div style={{ width: '350px', color: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 80 }}>
                <div style={{ display: 'flex', position: 'absolute', top: 30, right: 30 }}>
                    <div>
                        <button onClick={handleLogoutClick} style={{ backgroundColor: '#ffffff70', padding: 12, borderRadius: 10 }}>
                            Log out
                        </button>
                    </div>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: 28, marginTop: 80 }}>
                    Subscription completed
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src='/assets/complete.png' alt='Complete' style={{ height: 'auto', width: '100%', maxWidth: '200px' }} />
                </div>
                <div>
                    <div style={{ color: 'white', marginTop: 10, display: 'flex' }}>
                        <span className='font-bold'>Plan :</span> <span style={{ color: 'red', marginLeft: 10 }}>{ProfileData.interval === "year" ? <div>Yearly</div> : <div></div>}</span> <span style={{ color: 'red', marginLeft: 10 }}>{ProfileData.interval === "year" ? <div>Yearly</div> : <div></div>}</span> <span style={{ color: 'red', marginLeft: 10 }}>{ProfileData.interval === "month" ? <div>Monthly</div> : <div></div>}</span>
                    </div>
                    <div style={{ color: 'white', marginTop: 10, display: 'flex' }}>
                        <span className='font-bold'>Cost :</span> <span style={{ color: 'red', marginLeft: 10 }}>{ProfileData.amount === 10000 ? <div>$ 100</div> : <div></div>}</span> <span style={{ color: 'red', marginLeft: 10 }}>{ProfileData.amount === 2000 ? <div>$ 20</div> : <div></div>}</span>  <span style={{ color: 'red', marginLeft: 10 }}>{ProfileData.amount === 5000 ? <div>$ 50</div> : <div></div>}</span>
                    </div>
                </div>
                {/*<div style={{ color: 'white', fontWeight: '' }}>
                    <span style={{ color: 'white', fontWeight: 'bolder' }}>End time is</span> {endtime ? endtime : ''}
    </div>*/}

                <div>
                    {
                        HideUnsubscribeBtn ? ShowCancelTime :
                            <button onClick={handleUnSubscribe} style={{ backgroundColor: '#ffffff70', padding: 12, borderRadius: 10 }}>
                                {loading ? 'Loading' : 'Cancel subscription'}
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Page
