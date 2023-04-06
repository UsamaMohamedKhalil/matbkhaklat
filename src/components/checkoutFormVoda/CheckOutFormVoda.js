import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/config';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import { CALCULATE_SUB_TOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice';
import { CALC_TOTAL_ORDER_AMOUNT } from '../../redux/slice/orderSlice';
import Card from '../card/Card'
import CheckoutSummary from '../checkoutSummary/CheckoutSummary'
import styles from './CheckOutFormVoda.module.scss'





const initialAddressState = {
   name: "",
   line1: "",
   line2: "",
   city: "",
   state: "",
   postal_code: "",
   country: "",
   phone: "",
   pCode:'',
   comment:'',
   phoneSend: "",
   imageUrl:'',
 }; 

const CheckOutFormVoda = () => {
   const [shippingAddress, setShippingAddress] = useState({
      ...initialAddressState,
   });

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const userId = useSelector(selectUserID);
   const userEmail = useSelector(selectEmail);
   const cartItems = useSelector(selectCartItems);
   const totalAmount = useSelector(selectCartTotalAmount);

   const handelShipping = (e) =>{
      const {name , value} = e.target;
      setShippingAddress({
         ...shippingAddress,
         [name] : value
      });
   };


   const handelImageChange = (e) => {
      const file = e.target.files[0];
      //console.log(file);
      const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
      (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      }, 
      (error) => {
      toast.error(error.message);
      }, 
      () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

         setShippingAddress({
         ...shippingAddress, imageUrl: downloadURL
      })
      toast.success('تم رفع الأسكرين شوت بنجاح');
      });
   }
);}

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
      orderStatus: 'Order Placed...',
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
   <h2>الدفع من خلال فودافون كاش</h2>
      <form onSubmit={handelSubmit}>
      <div>
         <Card cardClass={styles.card}>
            <h3>طلبك عندنا في اسرع وقت</h3>
            <label>الأسم : </label>
            <input type='text'
            placeholder='ادخل الاسم ثلاثي'
            name='name'
            required
            value={shippingAddress.name}
            onChange={(e)=>handelShipping(e)}
            />
            <label>العنوان :</label>
            <input type='text'
            placeholder='العنوان'
            name='line1'
            required
            value={shippingAddress.line1}
            onChange={(e)=>handelShipping(e)}
            />
            <br />
            <label>:سكرين شوت لتحقق من عملية الدفع</label>
            <input type='file'
            placeholder='أرفع اسكرين شوت لتحقق من الطلب'
            name='postal_code'
            required
            onChange={(e)=>handelImageChange(e)}
            />
               <br />
            <label>الرقم الذي ارسلت منه :</label>
            <input type='text'
            placeholder='ادخل الرقم الذي ارسلت منه'
            name='phoneSend'
            required
            value={shippingAddress.phoneSend}
            onChange={(e)=>handelShipping(e)}
            />
            <label>رقم استقبال الطلب :</label>
            <input type='text'
            placeholder='ادخل الرقم الخاص باستقبال الطلب'
            name='phone'
            required
            value={shippingAddress.phone}
            onChange={(e)=>handelShipping(e)}
            />
            <label>كود الخصم :</label>
            <input type='text'
            placeholder='ادخل كود الخصم'
            name='pCode'
            
            value={shippingAddress.pCode}
            onChange={(e)=>handelShipping(e)}
            />
            <label>الملاحظات :</label>
            <input type='text'
            placeholder=' برجاء ادخال اي تعلقيات تخص الطلب'
            name='comment'
            
            value={shippingAddress.comment}
            onChange={(e)=>handelShipping(e)}
            />
            </Card>
            <button type='submit' 
            className='--btn --btn-primary'>احصل علي طلبك</button>
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

export default CheckOutFormVoda
