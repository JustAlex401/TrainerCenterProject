import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from 'axios';
import './payment.css';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "black",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}


const PaymentForm = () => {

  const [success, setSuccess ] = useState(false)
  const stripe = useStripe()
  const elements = useElements()


  const handleSubmit = async (e) => {
      e.preventDefault()
      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)
      })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("/payment", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
  }

  return (
      <>
      {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup" style={{backgroundColor: '#FFD700', boxShadow: 'none'}}>
                <div className="FormRow" style={{borderTop: 'none'}}>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="btn">Pay</button>
        </form>
        :
       <div>
           <h2 style={{color: 'white'}}>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
          
      </>
  )
}

export default PaymentForm;