import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';
import { db } from '../../firebase/config';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice';

import styles from './Checkout.module.scss'

const initialAddressState = {
   name: "",
   line1: "",
   city: "",
   phone: "",
   phone1:'',
   comment:'',
   pCode:'',

};

const CheckoutDetails = () => {

   const [shippingAddress, setShippingAddress] = useState({
      ...initialAddressState,
   });
   const userId = useSelector(selectUserID);
   const userEmail = useSelector(selectEmail);
   const cartItems = useSelector(selectCartItems);
   const totalAmount = useSelector(selectCartTotalAmount);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handelShipping = (e) =>{
      const {name , value} = e.target;
      setShippingAddress({
         ...shippingAddress,
         [name] : value
      });
   };

   const saveOrder = () =>{
      const today = new Date();
      const date = today.toDateString();
      const time = today.toLocaleTimeString();
      const orderConfig = {
         userId,
         userEmail,
         orderDate: date,
         orderTime: time,
         orderAmount: totalAmount,
         orderStatus: 'تم استقبال طلبك',
         cartItems,
         shippingAddress,
         createdAt: Timestamp.now().toDate(),
      }
      try{
         addDoc(collection(db, "orders"), orderConfig);
   
         dispatch(CLEAR_CART());
         toast.success("تم حفظ الطلب");
   
         navigate('/checkout-success');
      }catch(error){
         toast.error(error.message);
      }
   }
   const handelSubmit = (e) =>{
      e.preventDefault();
      dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
      saveOrder();
   };
   

return (
   <section>
      <div className={`container ${styles.checkout}`}>
         <h2>طلبك عندنا في اسرع وقت</h2>
         <form onSubmit={handelSubmit}>
            <div>
               <Card cardClass={styles.card}>
                  <h3>ادخل بيانتك</h3>
                  <label>الأسم :</label>
                  <input type='text'
                  placeholder='ادخل اسمك الثلاثي'
                  name='name'
                  required
                  value={shippingAddress.name}
                  onChange={(e)=>handelShipping(e)}
                  />
                  <label>العنوان :</label>
                  <input type='text'
                  placeholder='ادخل عنوانك '
                  name='line1'
                  required
                  value={shippingAddress.line1}
                  onChange={(e)=>handelShipping(e)}
                  />
                  <label>رقم التلفون :</label>
                  <input type='text'
                  placeholder='ادخل رقم الهاتف'
                  name='phone'
                  required
                  value={shippingAddress.phone}
                  onChange={(e)=>handelShipping(e)}
                  />
                  <label>رقم تلفون اخر:</label>
                  <input type='text'
                  placeholder='ادخل رقم الهاتف'
                  name='phone1'
                  required
                  value={shippingAddress.phone1}
                  onChange={(e)=>handelShipping(e)}
                  />
                  <label>الملاحظات :</label>
                  <input type='text'
                  placeholder=' برجاء ادخال أي تعلقيات تخص بالطلب'
                  name='comment'
                  required
                  value={shippingAddress.comment}
                  onChange={(e)=>handelShipping(e)}
                  />
                  <label>كود الخصم :</label>
                  <input type='text'
                  placeholder='ادخل كود الخصم'
                  name='pCode'
                  required
                  value={shippingAddress.pCode}
                  onChange={(e)=>handelShipping(e)}
                  />
                  <button type='submit' 
                  className='--btn --btn-primary'>احصل علي طلبك</button>
               </Card>
            </div>
            <div>
               <Card cardClass={styles.card}>
                  <CheckoutSummary />
               </Card>
            </div>
         </form>
      </div>
   </section>
)
}

export default CheckoutDetails
