import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import { sliderData } from './slider-data';
import './Slider.scss';
const Slider = () => {
   const [currentSlide , setCurrentSlide] = useState(0);
   const sliderLength = sliderData.length;
   

   const autoScroll = true;
   let slideInterval;
   let intervalTime = 5000;

   useEffect(()=>{
      setCurrentSlide(0)
   },[])



   useEffect(()=>{
      if(autoScroll === true){
         const auto = () => {
            slideInterval = setInterval(nextSlide,intervalTime)
         }
         auto();      
      }
      return () => clearInterval(slideInterval)
   },[currentSlide, slideInterval , autoScroll ])



   const nextSlide = () => {
         setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1) ;
   };
   const prevSlide = () => {
      setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
   };




  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>
      {
         sliderData.map((slide,idx)=>{
            const {image , heading , desc} = slide;
            return (
               <div className={idx === currentSlide ? "slide current" : "slide" }
               key={idx}>
                  {idx === currentSlide &&(
                     <>
                        <img src={image} alt='slide'/>
                        <div className='content'>
                           <h2>{heading}</h2>
                           <p>{desc}</p>
                           <hr />
                           <a href='#products' className='--btn --btn-primary'>
                              Shop Now
                           </a>
                        </div>
                     </>
                  )}
               </div>
            )
         })
      }
    </div>
  )
}

export default Slider
