import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice'
import styles from './ProductFilter.module.scss'
const ProductFilter = () => {
  const [category,setCategory] = useState('الجميع');
  const [price , setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ]


  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({products,price}))
  },[dispatch,products,price])

  
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({products,category:cat}))
  }

  const clearFilters = () => {
    setCategory('All')
    setPrice(maxPrice)

  };
  return (
    <div className={styles.filter}>
      <h4>الصنف</h4>
      <div className={styles.category}>
        {
          allCategories.map((cat,idx) => {
            return (
              <button 
                key={idx} 
                className={`${category}` === cat ? `${styles.active}` : null} 
                type='button' onClick={()=>filterProducts(cat)} >
                &#8250;  {cat}
              </button>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default ProductFilter
