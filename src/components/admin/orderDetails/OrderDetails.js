import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import spinnerImg from '../../../assests/spinner.gif';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus';
import styles from './OrderDetails.module.scss'

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const {id}= useParams();

  const {document} = useFetchDocument('orders' , id);

  useEffect(()=>{
    setOrder(document);
  },[document])
  console.log(order);

  return (
    <>
      <div className={styles.table}>
          <h2>تفاصيل الطلب :</h2>
          <div>
            <Link to='/admin/orders'>
            &larr;الرجوع لطلبات
            </Link>
          </div>

          <br />
          {
            order === null ? (
              <img src={spinnerImg} alt='loading...' style={{width: '50px'}}/>
            ) : (
              <>
                <p>
                  <b>رقم الطلب :</b> {order.id}
                </p>
                <p>
                  <b>اجمالي السعر :</b> {`جنية${order.orderAmount}`}
                </p>
                <p>
                  <b>حالة الطلب :</b> {order.orderStatus}
                </p>
                <p>
                  <b> ------------------------------------------</b> 
                  <br />
                  العنوان: {order.shippingAddress.line1},
                  <br />
                  رقم هاتف: {order.shippingAddress.phone}
                  <br />
                  اسم العميل: {order.shippingAddress.name}
                </p>
                <br />
                                {order.shippingAddress.phoneSend && (  <p>
                  <b>تم الدفع بواسطة فودافون كاش : </b> {order.shippingAddress.phoneSend} 
                  <img src={order.shippingAddress.imageUrl} style={{width:'100px'}}alt='loading..'/>
                </p>)}
                {order.shippingAddress.phone1 && (  <p>
                  <b>رقم هاتف أخر : </b> {order.shippingAddress.phoen1} 
                </p>)}
                {order.shippingAddress.comment && (  <p>
                  <b>ملاحظات : </b> {order.shippingAddress.comment} 
                </p>)}
                {order.shippingAddress.pCode && (  <p>
                  <b>كود الخصم : </b> {order.shippingAddress.pCode} 
                </p>)}
    
                <table>
                  <thead>
                    <tr>
                      <th>الطلبات</th>
                      <th>الطلب</th>
                      <th>السعر</th>
                      <th>الكمية</th>
                      <th>اجمالي</th>
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
                            <td>{`جنية${price}`}</td>
                            <td>{cartQuantity}</td>
                            <td>
                              {`جنية${(price * cartQuantity).toFixed(2)}`}
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
          <ChangeOrderStatus order={order} id={id}/>
      </div>
    </>
  )
}

export default OrderDetails
