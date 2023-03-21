import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { selectUserID } from '../../redux/slice/authSlice';
import { selectOrderHistory, STORE_ORDERS } from '../../redux/slice/orderSlice';
import styles from './OrderHistory.module.scss';

const OrderHistory = () => {
  const {data , isLoading} = useFetchCollection('orders');
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(STORE_ORDERS(data));
  },[data,dispatch])

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  }

  const filteredOrders = orders.filter((order) =>
  order.userId === userId
  )
  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>طلباتك</h2>
        <p> اضغط علي الطلب <b>للتقيم </b></p>
        <br />
        <>
          {
            isLoading && <Loader />
          }
          <div className={styles.table}>
            {
              orders.length === 0 ? (
                <p>لا يوجد أي طلبات حالياً !</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>الطلبات</th>
                      <th>اليوم</th>
                      <th>رقم الطلب</th>
                      <th>سعر الطلب</th>
                      <th>حالة الطلب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order,index)=> {
                      const {id , orderDate , orderTime,orderAmount , orderStatus} = order;
                      return(
                        <tr key={id} onClick={()=>handleClick(id)}>
                          <td>{index + 1}</td>
                          <td>{orderDate} at {orderTime}</td>
                          <td>{id}</td>
                          <td>{`جنية${orderAmount}`}</td>
                          <td>
                            <p className={orderStatus !== 'delivered' ? `${styles.pending}` : `${styles.delivered}`}>
                              {orderStatus}
                            </p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )
            }
          </div>
        </>
      </div>
    </section>
  )
}

export default OrderHistory
