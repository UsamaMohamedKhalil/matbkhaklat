import React, { useEffect } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from '../../../redux/slice/orderSlice'
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice'
import InfoBox from '../../infoBox/InfoBox'
import Chart from '../../chart/Chart'
import styles from './Home.module.scss'

// icons 
const earnIcon = <AiFillDollarCircle size={30} color='#b624ff' />;
const productIcon = <BsCart4 size={30} color='#1f93ff'/> ; 
const ordersIcon = <FaCartArrowDown size={30} color='orangered' /> ;
const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const fbProducts = useFetchCollection('products');
  const {data} = useFetchCollection('orders');
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(STORE_PRODUCTS({
      products: fbProducts.data,
    }));

    dispatch(STORE_ORDERS(data))

    dispatch(CALC_TOTAL_ORDER_AMOUNT())
  },[dispatch, data , fbProducts])


  return (
    <div className={styles.home}>
      <h2>الأدمن</h2>
      <div className={styles['info-box']}>
        <InfoBox cardClass={`${styles.card} ${styles.card1}`}
        title={'المبيعات'}
        count={`جنية${totalOrderAmount}`}
        icon={earnIcon}/>
        <InfoBox cardClass={`${styles.card} ${styles.card2}`}
        title={'المنتجات'}
        count={products.length}
        icon={productIcon}/>
        <InfoBox cardClass={`${styles.card} ${styles.card3}`}
        title={'الطلبات'}
        count={orders.length}
        icon={ordersIcon}/>
      </div>
      <div>
        <Chart />
      </div>
    </div>
  )
}

export default Home
