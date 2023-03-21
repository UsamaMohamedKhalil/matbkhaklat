import React, { useState } from 'react'
import resetImg from '../../assests/forgot.png'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'


const Reset = () => {
  const [email , setEmail] = useState('');
  const [isLoading , setIsLoading] = useState(false);

  const resetPaswword = (e) => {
    e.preventDefault();
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsLoading(false)
      toast.success('تم ارسال رابط الي حسابك , تابع حسابك');
    })
    .catch((error) => {
      setIsLoading(false)
      toast.error(error.message);
    });
    
  }
  return (
  <>
    {isLoading && <Loader />}
   
      <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt='reset' width='400'/>
      </div>
      <Card>
        <div className={styles.form}>
            <h2>أسترجاع حسابك</h2>
            <form onSubmit={resetPaswword}>
              <input 
                type='text' 
                placeholder='ادخل حسابك' 
                required 
                value={email} 
                onChange= {(e) => {setEmail(e.target.value)}}/>
              <button 
                className='--btn --btn-primary --btn-block'
                type='submit'
              >
                استرجاع الحساب
              </button>
              <div className={styles.links}>
                <p>
                  <Link to='/login'>- التسجيل</Link>
                </p>
                <p>
                  <Link to='/register'>- انشاء حساب</Link>
                </p>
              </div>
            </form>
      </div>
      </Card>
  </section>
  </>
  )
}

export default Reset
