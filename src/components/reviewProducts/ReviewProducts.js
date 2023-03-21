import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import StarsRating from 'react-star-rate'
import { toast } from 'react-toastify'
import useFetchDocument from '../../customHooks/useFetchDocument'
import { db } from '../../firebase/config'
import { selectUserID, selectUserName } from '../../redux/slice/authSlice'
import { selectProducts } from '../../redux/slice/productSlice'
import Card from '../card/Card'
import styles from './ReviewProducts.module.scss'
import spinnerImg from '../../assests/spinner.gif'
const ReviewProducts = () => {
  const [rate , setRate] = useState(0);
  const [review , setReview] = useState('');
  const [product , setProduct] = useState(null);
  const { id } = useParams();
  const {document} = useFetchDocument('products' , id);
  const products = useSelector(selectProducts);
  const userId = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(()=>{
    setProduct(document);
  },[document])
  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userId,
      userName,
      productId: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    }
    try{
      addDoc(collection(db, "reviews"), reviewConfig);
      setRate(0);
      setReview('');
      toast.success("تم حفظ تقيمك");
    }catch(error){
      toast.error(error.message);
    }
  }
  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>تقيم الطلب</h2>
        {product === null ? (
          <img src={spinnerImg} alt='Loading ...' style={{width: '100px'}}/>
        ) : (
          <>
          <p>
          <b>اسم الطلب:</b> {product.name}
        </p>
        <img src={product.imageUrl} alt={product.name} style={{width: '100px'}}/>
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>التقيم:</label>
            <StarsRating 
            value={rate}
            onChange={rate => {
              setRate(rate);
            }}/>
            <label>التقيم : </label>
            
            <textarea value={review} onChange={(e) => setReview(e.target.value)} cols='30' required rows='10'></textarea>
            <button type='submit' className='--btn --btn-primary'>حفظ التقيم</button>
          </form>
        </Card>
        </>
        )}
      </div>
    </section>
  )
}

export default ReviewProducts
