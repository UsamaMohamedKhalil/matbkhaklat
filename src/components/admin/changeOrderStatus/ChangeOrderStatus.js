import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from './ChangeOrderStatus.module.scss'
const ChangeOrderStatus = ({order , id}) => {
  const [status,setStatus] = useState();
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();
  const editOrder = (e, id) =>{
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress : order.shippingAddress,
      createdAt: order.createdAt,
      editAt: Timestamp.now().toDate(),
    }
    try{
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("تم تغير حالة الطلب بنجاح");
      navigate('/admin/orders');
    }catch(error){
      setIsLoading(false);
      toast.error(error.message);
    }
  }


  return (
    <>
    {
      isLoading && <Loader />
    }
    <div className={styles.status}>
    <Card cardClass={styles.card}>
      <h4> تغير حالة الطلب </h4>
      <form onSubmit={(e) => editOrder(e, id)}>
        <span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value='' disabled>
              -- choose one --
            </option>
            <option value='تم استقبال الطلب'>
            تم استقبال الطلب
            </option>
            <option value='جاري تنفيذ طلبك'>
            جاري تنفيذ طلبك
            </option>
            <option value='جاري توصيل طلبك'>
            جاري توصيل طلبك
            </option>
            <option value='تم توصيل'>
            تم توصيل
            </option>
          </select>
        </span>
        <span>
          <button type='submit' className='--btn --btn-primary'>تغير</button>
        </span>
      </form>
    </Card>
    </div>
    </>
  )
}

export default ChangeOrderStatus
