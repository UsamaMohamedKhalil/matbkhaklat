import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Product from '../../components/product/Product'
import Slider from '../../components/slider/Slider'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'
import styles from './Home.module.scss'

const Home = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  console.log(isLogin)
  const navigate = useNavigate(selectIsLoggedIn);
  const url = window.location.href;
  useEffect(()=>{
    if(isLogin){
      navigate('/');
    }else{
      navigate('/login');

    }
  },[isLogin])


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
    
      <Product />
  

      
    </div>
  )
}

export default Home
