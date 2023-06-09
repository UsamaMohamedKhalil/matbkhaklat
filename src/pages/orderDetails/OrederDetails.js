import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../../customHooks/useFetchDocument';
import styles from './OrderDetails.module.scss'
import spinnerImg from '../../assests/spinner.gif'

const OrederDetails = () => {
  const [order, setOrder] = useState(null);
  const {id}= useParams();

  const {document} = useFetchDocument('orders' , id);

  useEffect(()=>{
    setOrder(document);
  },[document])
  console.log(order);
  return (
    <section>
      <div className={`container ${styles.table}`}>
          <h2>Order Details</h2>
          <div>
            <Link to='/order-history'>
            &larr; Back to orders
            </Link>
          </div>
          <br />
          {
            order === null ? (
              <img src={spinnerImg} alt='loading...' style={{width: '50px'}}/>
            ) : (
              <>
                <p>
                  <b>Order ID :</b> {order.id}
                </p>
                <p>
                  <b>Order Amount :</b> {`$${order.orderAmount}`}
                </p>
                <p>
                  <b>Order Status :</b> {order.orderStatus}
                </p>
                <br />
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order.cartItems.map((cart,idx) =>{
                        const {id , name , price , imageUrl , cartQuantity} = cart;
                        return (
                          <tr key={id}>
                            <td>
                              <b>{idx + 1}</b>
                            </td>
                            <td>
                              <p>
                                <b>{name}</b>
                              </p>
                              <img src={imageUrl} alt={id} style={{width: '100px'}}/>
                            </td>
                            <td>{`$${price}`}</td>
                            <td>{cartQuantity}</td>
                            <td>
                              {`$${(price * cartQuantity).toFixed(2)}`}
                            </td>
                            <td className={styles.icons}>
                            <Link to={`/review-product/${id}`}>
                              <button className='--btn --btn-primary'>
                                  Review Product
                              </button>
                            </Link>
                            </td>
                          </tr>
                        )
                      } )
                    }
                  </tbody>
                </table>
              </>
            )
          }
      </div>
    </section>
  )
}

export default OrederDetails
