import React, { useState } from 'react'
import "../styles/replenish-form.scss"
import { toast } from 'react-toastify';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
import axios from 'axios'

const CARD_OPTIONS = {
    style: {
        base: {
          iconColor: "#aab7c4",
          width: '100%',
          padding: '20px',
          fontSize: '20px',
          borderRadius: '7px',
          border: '1px solid #aab7c4',
          '::placeholder': {
              color: '#aab7c4',
            },
        },
      },
  };
  const ReplenishForm = ({setUpdate}) => {
    const [values, setValues] = useState({
        card_number: "",
        card_cvc: "",
        card_expiry: "",
        amount: ""
      })
    const stripe = useStripe();
    const elements = useElements();
    function onChange(e) {
        setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
      }
    async function replenish(e) {
        e.preventDefault()
        if (!values.amount) return toast("Please field all card field", {type: "error"})
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(
            CardCvcElement,
            CardExpiryElement,
            CardNumberElement
          ),
        }); 
        if (!error) {
            try {
              const {id} = paymentMethod;
              await axios.put(
                "/profile/replenish/balance",
                {
                  amount: +values.amount,
                  id,
                }
              );
      
              setUpdate(true)
              toast("Successful Payment", {type: "success"});
            } catch (error) {
              toast("Minimum balance replenishment 50$", {type: "error"})
              console.log("Error", error);
            }
          } else {
            console.log(error.message);
          }
      }
  return (
        <form id="replenish-form" onSubmit={replenish}>
            <div className="form-head">
            <div className='block'>
            <label htmlFor="card_number">Card number</label>
            <CardNumberElement options={CARD_OPTIONS}/>
            </div>
            <div className="block">
            <label htmlFor="card_cvc">CVC</label>
            <CardCvcElement options={CARD_OPTIONS}/>
            </div>
            </div>
            <div className="form-body">
            <div className="block">
            <label htmlFor="card_expiry">Validity</label>
            <CardExpiryElement options={CARD_OPTIONS}/>
            </div>
            <div className="block">
            <label htmlFor="amount">Amount <span>in dollars</span></label>
            <input onChange={onChange} value={values.amount} type="number" name="amount" id="amount" placeholder='100'/>
            </div>
            </div>
            <div className="btns">
            <button>Replenish</button>
            </div>
          </form>
  )
}

export default ReplenishForm
