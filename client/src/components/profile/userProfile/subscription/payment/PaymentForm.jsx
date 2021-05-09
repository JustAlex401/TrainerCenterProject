import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './payment.css';
import { useMessage } from '../../../../../hooks/messages/message.hook';

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
			"::placeholder": { color: "grey" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}


const PaymentForm = ({setClose, item}) => {

  const [success, setSuccess ] = useState();
  const userId = useSelector(state => state.user.data.userId);
  const stripe = useStripe();
  const elements = useElements();
  const message = useMessage();

  const handleSubmit = async (e) => {
      e.preventDefault()
      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)
      })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("/api/user/payment", {
                amount: item.price,
                number: item.number,
                id,
                userId
            })

            if(response.data.message){
              message(response.data.message);
              setClose(true);
              return;
            }

            if(response.data.success) {
                console.log("Successful payment")
                setClose(true)
                message('Payment is success')
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
        setSuccess(false)
    }
  }

   return (
      <>
        <form onSubmit={handleSubmit}>
          {console.log(item)}
            <fieldset className="FormGroup" style={{backgroundColor: '#FFD700', boxShadow: 'none'}}>
                <div className="FormRow" style={{borderTop: 'none'}}>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="btn">Pay</button>
        </form>          
      </>
  )
}

export default PaymentForm;