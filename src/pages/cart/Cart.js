import React, { useEffect } from 'react';
import styles from './Cart.module.scss';
import { ADD_TO_CART, CALCULATE_SUB_TOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems , selectCartTotalAmount , selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';
function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isLogged = useSelector(selectIsLoggedIn);
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
  }

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  }
  
  const removeFromCart =(cart) => {
    dispatch(REMOVE_FROM_CART(cart))
  }
  const clearCart = () => {
    dispatch(CLEAR_CART());
  }

  useEffect(()=>{
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(''));
  },[dispatch,cartItems])

  const url = window.location.href;
  
  const checkOut = () => {
    if(isLogged) {
      navigate('/checkout-details');
    }else{
      dispatch(SAVE_URL(url));
      navigate('/login');
    }
  }
  
  const checkOutVodaFone = () => {
    if(isLogged) {
      navigate('/checkout-vodafone-cash');
    }else{
      dispatch(SAVE_URL(url));
      navigate('/login');
    }
  }


  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>مشترياتك</h2>
        {
          cartItems.length === 0 ? (
            <>
              <p>لا يوجد مشتريات حاليا </p>
              <br />
              <div>
                <Link to='/#products'>
                  &larr; اذهب لطلب
                </Link>
              </div>
            </>
          ) : (
            <>
            <table>
              <thead>
                <tr>
                  <th>عدد الأصناف</th>
                  <th>الطلب</th>
                  <th>السعر</th>
                  <th>الكميه</th>
                  <th>القيمه</th>
                  <th>مسح</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart,index) => {
                  const {id , name , price , cartQuantity , imageUrl} = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageUrl} alt={name} style={{width: '100px'}}/>
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button 
                            className='--btn'
                            onClick={()=>decreaseCart(cart)}
                            >-</button>
                          <p>
                            <b>
                              {cartQuantity}
                            </b>
                          </p>
                          <button 
                            className='--btn'
                            onClick={()=>increaseCart(cart)}>+</button>
                        </div>
                      </td>
                      <td>
                        {(cartQuantity * price).toFixed(2)}
                      </td>
                      <td className={styles.icons}>
                        <FaTrashAlt 
                          size={18} 
                          color='red'
                          onClick={()=>removeFromCart(cart)}/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
                <button 
                  className='--btn --btn-danger'
                  onClick={() => clearCart()}
                  >مسح كل المشتريات</button>
                <div className={styles.checkout}>
                  <div>
                    <Link to='/#products'>
                      &larr; كمل طلباتك
                    </Link>
                  </div>
                  <br />
  
                  <Card cardClass={styles.card}>
                    <p><b>{`عدد الطلبات: ${cartTotalQuantity}`}</b></p>
                    <div className={styles.text}>
                      <h4>اجمالي:</h4>
                      <h3>{`جنية${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                    <p>الشحن إلي الاسكندرية 35ج </p>
                    <p> الشحن إلي القاهرة 60ج</p>
                    <button className='--btn --btn-danger --btn-block'
                      onClick={()=>checkOutVodaFone()}>فودافون كاش</button>
                  </Card>
                </div>
            </div>
            </>
          )
        }

      </div>
    </section>
  )
}

export default Cart
