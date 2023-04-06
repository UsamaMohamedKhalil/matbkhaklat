import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../redux/slice/productSlice';
import spinnerImg from '../../assests/spinner.gif'
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import { MdRestaurantMenu } from 'react-icons/md';

const Product = () => {
  const {data , isLoading} = useFetchCollection('products');
  const [showFilter,setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(GET_PRICE_RANGE({
      products: data,
    }))
  },[dispatch,data])

  const toggleFilter = () =>{
    setShowFilter(!showFilter);
  }
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : 
       `${styles.filter}`}>
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <img src={spinnerImg} alt='Loading...' style={{width:'100px'}} 
          className='--center-all'/> : (
            <ProductList products={products} />
          ) }
          <div className={styles.icon} onClick={toggleFilter}>
            <MdRestaurantMenu size={20} color='orangered'
            />
            <p>
              <b>{showFilter ? 'إخفاء المنيو' : 'المنيو'}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
    

  )
}

export default Product
