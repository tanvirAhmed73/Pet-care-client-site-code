import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useDonationCampaign from "../../../Hooks/useDonationCampaign";
import Swal from "sweetalert2";


const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [donationCampaign, refetch]=useDonationCampaign();
  const [donationAmountInput, setDonationAmountInput] = useState('');

  console.log(donationAmountInput)

  useEffect(() => {
      if (donationAmountInput > 0) {
          axiosSecure.post('/create-payment-intent', { donation: donationAmountInput })
              .then(res => {
                  console.log(res.data.clientSecret);
                  setClientSecret(res.data.clientSecret);
              })
      }

  }, [axiosSecure, donationAmountInput])

  const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
          return
      }

      const card = elements.getElement(CardElement)

      if (card === null) {
          return
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card
      })

      if (error) {
          console.log('payment error', error);
          setError(error.message);
      }
      else {
          console.log('payment method', paymentMethod)
          setError('');
      }

      // confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: card,
              billing_details: {
                  email: user?.email || 'anonymous',
                  name: user?.displayName || 'anonymous'
              }
          }
      })

      if (confirmError) {
          console.log('confirm error')
      }
      else {
          console.log('payment intent', paymentIntent)
          if (paymentIntent.status === 'succeeded') {
              console.log('transaction id', paymentIntent.id);
              setTransactionId(paymentIntent.id);

              // now save the payment in the database
              const payment = {
                  email: user.email,
                  donatedAmount: donationAmountInput,
                  transactionId: paymentIntent.id,
                  date: new Date(),
                  donationIds: donationCampaign.map(item => item._id),
                  // menuItemIds: cart.map(item => item.menuId),
                  status: 'pending'
              }

              const res = await axiosSecure.post('/create-payment', payment);
              refetch();
              if (res.data?.paymentResult?.insertedId) {
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Thank you for the Donation",
                      showConfirmButton: false,
                      timer: 1500
                  });
                  navigate('/donationCampaign')
              }

          }
      }

  }

  return (
      <form onSubmit={handleSubmit}>
          <CardElement
              options={{
                  style: {
                      base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                              color: '#aab7c4',
                          },
                      },
                      invalid: {
                          color: '#9e2146',
                      },
                  },
              }}
          />
          Donation Amount:
                  <input
                    className="input input-bordered  mb-6 ml-2"
                    placeholder="Donation Amount"
                    type="text"
                    name="address"
                    value={donationAmountInput}
                    onChange={(e) => setDonationAmountInput(e.target.value)}
                  />
          <button className="btn btn-sm btn-primary my-4" type="submit" >
              Pay
          </button>
          <p className="text-red-600">{error}</p>
          {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
      </form>
  );
};




const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API);

const DonationDetailsCardMake = ({ data }) => {
  const { name, age, location, image, maximumDonationAmount, donatedAmount } = data;
  const [isDonationExpired, setIsDonationExpired] = useState(false);
  const { lastDateOfDonation } = data;

  useEffect(() => {
    const currentDate = new Date();
    setIsDonationExpired(currentDate > new Date(lastDateOfDonation));
  }, [lastDateOfDonation]);

  return (
    <div className="w-full  mb-11">
      <div className=" mx-auto  bg-base-100 shadow-xl">
        <figure>
          <img className="w-full h-[400px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title text-6xl text-purple-700 ">
            {name}
            <div className="badge badge-secondary">AGE:0{age}, Maximun Donation Amount : {maximumDonationAmount}, Donated Amount : {donatedAmount}</div>
          </h2>
          <div className="card-actions justify-end">
            <div className=" badge badge-outline">{location}</div>
          </div>
        </div>

        {/* adopt button */}

        <div>
        <button
            className="btn block w-full mx-auto text-white btn-info"
            onClick={() => {
              if (!isDonationExpired) {
                document.getElementById("my_modal_5").showModal();
              }
            }}
            disabled={isDonationExpired}
          >
            {isDonationExpired ? 'Donation Expired' : 'Donate Now'}
          </button>
          {/* <button className="btn block btn-success" onClick={()=>document.getElementById('my_modal_5').showModal()}>Borrow</button> */}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Donate Now</h3>

              <div className="modal-action">
                <form method="dialog">
                


                <div>
                  <Elements stripe={stripePromise}>
                      <CheckoutForm></CheckoutForm>
                  </Elements>
                </div>




                  {/* if there is a button in form, it will close the modal */}
                  {/* <button className="btn">Submit</button> */}
                  <button className="btn mt-4">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsCardMake;