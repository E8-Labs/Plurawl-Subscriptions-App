'use client'
import { useState } from 'react'
import {
    CardElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import Stripe from 'stripe'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

//stripe code required
let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY

let stripeKey = process.env.REACT_APP_ENVIRONMENT === "Production" ? process.env.REACT_APP_STRIPE_SECRET_KEY_LIVE : process.env.REACT_APP_STRIPE_SECRET_KEY
let envr = process.env.REACT_APP_ENVIRONMENT;

//useful code
function Addnewcard2(props) {

    const stripe = Stripe(stripeKey);
    // const [codes, setCodes] = useState(promosArray)

    const stripeReact = useStripe();
    const elements = useElements();
    console.log("Add card screen")
    const [values, setValues] = useState({
        cardnumber: "",
        cardholdername: "",
        cvv: "",
        expirydate: "",

    })

    function getExpiryFromDate() {
        const { cardholdername, cardnumber, cvv, expirydate } = values;
        const myArray = expirydate.split("/");
        if (myArray.length === 2) {
            let m = Number(myArray[0].trim()) || 0;
            let y = Number(myArray[1].trim()) || 0;
            //console.log("Month " + m + " Year " + y)
            return [m, y];

        }
        else {

            //console.log("Invalid expiry");
            return null;
        }
    }



    const handleSubmitStripeCardElement = (event) => {
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            //console.log("Stripe not initialized")
            return;
        }
        const card = elements.getElement(CardElement);
        //console.log("User element card is ")
        //console.log(card)
        stripeReact.createToken(card).then(function (result) {
            // Handle result.error or result.token
            //console.log("result creating token")
            //console.log(result) //contains a card object as well

        });
    }
    const handleSubmit = async (event) => {

        event.preventDefault();
        // navigate("/prices")

        {

            // const { cardholdername, cardnumber, cvv, expirydate } = values;
            if (!stripe || !elements) {
                return;
            }
            const card = elements.getElement(CardElement);
            stripeReact.createToken(card).then(async function (tok) {
                // Handle result.error or result.token
                console.log("result creating token")
                console.log("token found is",tok) //contains a card object as well
                //working until here
                if (tok.token.id) {

                    const d = localStorage.getItem(process.env.REACT_APP_LocalSavedUser);
                    const user = JSON.parse(d)
                    //console.log("User is " + user.userid)
                    if (user === null) {
                        console.log('USer is null')
                    }
                    //console.log("Token obtained " + tok.id)

                    const apiUrl = 'http://13.58.134.250:8003/api/users/add_card';
                    const userDetails = localStorage.getItem('user')
                    const i = JSON.parse(userDetails)
                    let config = {
                        method: 'post',
                        url: apiUrl,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + i.token
                        },
                        data: JSON.stringify({ source: tok.token.id })
                    };

                    const data = await axios.request(config);
                    console.log('Token for add card is', i.token)
                    if (data.data.status === true) {
                        //console.log(data.data); // this will have the whole response from the api with status, message and data
                        // navigate("/prices")
                        // props.oncardAdded()
                        // props.closePopup()

                        router.push('/home/cards')
                    }
                    else {
                        //console.log( data.data)
                        //console.log("Error " + JSON.stringify(data.data.validation_errors))
                        toast.error(data.data.message, {
                            position: "bottom-right",
                            pauseOnHover: true,
                            autoClose: 8000,
                            theme: "dark"
                        });
                    }
                }
                else if (tok.error) {
                    //console.log("Error ")
                    //console.log(tok.error)
                    toast.error(tok.error, {
                        position: "bottom-right",
                        pauseOnHover: true,
                        autoClose: 8000,
                        theme: "dark"
                    });
                }
            });





        }

    }

    const handleChangePromo = (event) => {
        localStorage.setItem("promo_temp", event.target.value);


    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })

    }


    //code for moving back to cards screen
    const router = useRouter();
    const handleBackclick = () => {
        router.back('')
    }

    return (
        <div className="w-full" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center' }}>

            <div style={{ width: '350px', color: 'white' }}>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 30 }}>
                    <div className='w-1/6' style={{ display: 'flex', alignItems: 'center' }}>
                        <button onClick={handleBackclick} style={{ display: 'flex', alignItems: 'center' }}>
                            <img src='/assets/backicon2.png' style={{ height: '25px', width: '30px' }} alt='backicon' />
                        </button>
                    </div>
                    <div className='w-4/6' style={{ display: 'flex', justifyContent: 'center', gap: 8, fontSize: 24 }} >
                        Add New Card
                    </div>
                    <div className='w-1/6'></div>
                </div>

                <form style={{}}>

                    <div style={{ border: '1px solid black', height: '60px', marginTop: '50px', }}>
                        <CardElement options={{
                            style: {
                                backgroundColor: 'white',
                                padding: '10px 20px 11px',
                                borderRadius: 5,
                                width: '100%',
                                boxshadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
                                base: {
                                    backgroundColor: "white",
                                    color: 'black',
                                    border: '5px solid blue',
                                    padding: '20px'
                                    // height: '100%'
                                },
                            },
                        }} />

                    </div>
                    <button type='submit' onClick={handleSubmit}>Save Card</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: top; // vertical center
//   gap: 0rem;
//   align-items: center; //horizontal center
//   background-color: #0C1339;
//   .titleLabel{
//     flex: 1,
//     justify-content: left;
//     align-items: left;
//     width: 100vw;
//     color: white;
//     label{
//       padding-left: 5px;
//       color: white;
//     }
//   }
//   .headingrow{
//     padding-top: 1rem;

//     justify-content: space-between;
//     align-items: center;
//     background-color: transparent;
//     width: 100vw;
//     .btn{
//       display: flex;
//       flex-direction: row;
//       // background-color: red;
//       justify-content: center;
//       align-items: center;
//     }
//     .backbtn{
//       // background-color: black;
//       width: 15vw;
//     }
//     .centertitlediv{
//       // width: 70vw;
//       align-items: center;
//       justify-content: center;
//       background-color: transparent;
//     }
//   }
//   .innerLabel{
//     background-color: white;
//     height: 40vh;

//   }
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 100vw;
//     gap: 2rem;
//     // background-color: red;
//     border-radius: 2rem;
//     padding: 1rem 1rem;
//     .inputuser {
//       background-color: #0C1339;
//       padding: 0.6rem;
//       border: none;
//       border-bottom: 0.1rem solid white;

//       color: white;
//       // width: 100%;
//       font-size: 1rem;
//       &:focus {
//         border-bottom: 0.1rem solid white;
//         outline: none;
//       }
//     }
//   }

//   button {
//     background-color: #FFFFFF15;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.9rem;
//     font-size: 1rem;
//     // text-transform: uppercase;
//     &:hover {
//       background-color: #FFFFFF45;
//     }
//   }
//   span {
//     color: white;
//     text-transform: uppercase;
//     a {
//       color: #4e0eff;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }

//   .toast-message {
//     background: red;
//     color: #fff;
//     font-size: 1rem;
//     width: 100vw;
//     height: 5vh;
//     padding: 1rem;
//     margin-bottom: 2rem;
// }
// .card {
//   background-color: white;
//   padding: 10px 20px 11px;
//   border-radius: 5px;
//   width: 100%;
//   border: 1px solid #afafaf;
//   box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
// }
// `;


export default Addnewcard2; 