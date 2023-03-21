import React, { useEffect } from 'react'
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'
import styles from './Home.module.scss'

const Home = () => {
  const url = window.location.href;
  
  const scrollToProduct = () => {
    if(url.includes('#products')) {
      window.scrollTo({
        top: 750,
        behavior: 'smooth'
      })
      return 
    }
  }
  useEffect(()=>{
    scrollToProduct();
  },[])
  return (
    <div>
{/*      <Slider />       
 */}   <Product />
    </div>
  )
}

export default Home
