import React from 'react'
import "../styles/wallet.scss"
import {
    Elements,
  } from '@stripe/react-stripe-js';
  import {loadStripe} from '@stripe/stripe-js';
  import ReplenishForm from './../Components/ReplenishForm';
import { Navigate, useOutletContext } from 'react-router-dom';
import ProfileNav from './../Components/NavBars/ProfileNav';
  const stripePromise = loadStripe(
    "pk_test_51NXauRBRB4VTBtLYdluYkPZsY9Udo6czptQefuEsrnsEGeJsxzoFqcqqISWujbiQTSzASstjC1tjl5mbUFatgtRk00IJAVer6r"
    );
const Wallet = () => {
    const [setUpdate,me] = useOutletContext()
    function $toSom(number) {
        const exchangeRate = 10500
        const sum = number * exchangeRate
        return sum.toLocaleString()
    }
  return  me?.isVerified ? (
    <div id='wallet'>
    <ProfileNav activePage={"Wallet"}/>
    <div id='data'>
    <div className='data-head'>
    <h3>
    Wallet
    </h3>
    <p>
    You can fund your wallet using your credit card (Visa, MasterCard)
    </p>
    </div>
    <div className="data-body">
      <h4>Payment will be automatically taken from your Sello wallet <span>Your Balance: {$toSom(me?.balance)} s'om</span></h4>
    </div>
    <Elements stripe={stripePromise}>
    <ReplenishForm setUpdate={setUpdate}/>
    </Elements>
  </div>
    </div>
  ) : null
}

export default Wallet
