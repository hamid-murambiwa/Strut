import React, {
  useState, useRef, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiCalls from '../../../services/services';
import { useCart } from '../../CartContext';
import '../../../styling/App.css';

export default function Paypal() {
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(0);
  const cart = useCart();
  const paypal = useRef();
  const [userData] = useState(JSON.parse(localStorage.getItem('user')) === null ? { logged_in: false } : JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  function totalPrice() {
    let price = 0;

    // eslint-disable-next-line array-callback-return
    cart.map((e) => {
      price += e.price;
    });

    return price.toFixed(1);
  }

  function products() {
    let products = '';

    // eslint-disable-next-line array-callback-return
    cart.map((e) => {
      if (products === '') {
        products += `${e.name} x${e.quantity}`;
      } else {
        products += `, ${e.name} x${e.quantity}`;
      }
    });

    return products;
  }

  useEffect(() => {
    apiCalls.fetchPrice(totalPrice(), setPrice, setMessage);
    if (price !== 0) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: products(),
                amount: {
                  currency_code: 'GBP',
                  value: price,
                },
              },
            ],
          }),
          onApprove: async (data, actions) => { // Authorize the transaction
            const or = await actions.order.capture();
            const order = or;
            order.purchase_units[0].amount.value = totalPrice();
            order.purchase_units[0].amount.currency_code = 'ZAR';
            const resData = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
            resData.push(order);
            const newData = JSON.stringify(resData);
            localStorage.setItem('order', newData);
            apiCalls.handleOrder(userData, order.links[0].href, totalPrice, setMessage);
            localStorage.removeItem('cart');
            setTimeout(() => {
              navigate('/orders');
              document.location.reload();
            }, [1500]);
          },
          onError: (err) => {
            setMessage(err);
          },
        })
        .render(paypal.current);
    }
  }, [price]);

  return (
    <div className="container4">
      <section className="container-pay">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <div ref={paypal} />
      </section>
    </div>
  );
}
