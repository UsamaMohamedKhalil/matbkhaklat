import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import Card from '../card/Card';

import styles from './CheckoutSummary.module.scss'

const CheckoutSummary = () => {
   const cartItems = useSelector(selectCartItems);
   const cartTotalAmount = useSelector(selectCartTotalAmount);
   const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  return (
    <div>
      <h4>التفاصيل</h4>
      <div>
         {
            cartItems.length === 0 ? (
               <>
               <p>لا يوجد لديك اي مشتريات</p>
               <button className='--btn'>
                  <Link to='/#products'>اذهب لطلب</Link>
               </button>
               </>
            ) : (
               <div>
                  <p>
                     <b>{`عدد الطلبات: ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                     <h4> اجمالي</h4>
                     <h3>${cartTotalAmount.toFixed(2)}</h3>
                  </div>
                  {
                     cartItems.map((item,idx) =>{
                        const {id,name,price,cartQuantity}= item
                        return(
                           <Card key={id} cardClass={styles.card}>
                              <h4>الطلب : {name}</h4>
                              <p>الكميه : {cartQuantity}</p>
                              <p>قيمة الطلب الواحد : {price}</p>
                              <p>اجمالي : {price * cartQuantity}</p>
                           </Card>
                        )
                     })
                  }
               </div>
            )
         }
      </div>
    </div>
  )
}

export default CheckoutSummary
