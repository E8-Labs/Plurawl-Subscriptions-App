import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const elementOptions = {
        style: {
            
            base: {
                // height: '150px',
                backgroundColor: '#f0f0f0',
                color: 'black',
                fontSize: '22px',
                '::placeholder': {
                    color: 'gray',
                },
            },
            invalid: {
                color: 'red',
            },
        },
    };

    return (
        <div className="flex flex-col " style={{width: '100vw', height: '100vh', backgroundColor: 'black',
        flexDirection: 'column', display: 'flex'}}>
            <div className="w-full" style={{width: '100vw', height: '50px'}}>
                <div className="">
                    <CardNumberElement options={elementOptions} />
                </div>
            </div>
            <div className="" style={{backgroundColor: '', height: '150px', width: '100vw',
                flexDirection: 'row', display: 'flex', justifyContent: 'space-around'}}>
                <div className=""
                 style={{width: '30vw', height: '50px'}}>
                    <CardExpiryElement options={elementOptions} />
                </div>
                <div className=""
                style={{width: '30vw', height: '50px'}}>
                    <CardCvcElement options={elementOptions} />
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
