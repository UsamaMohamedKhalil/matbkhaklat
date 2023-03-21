import React, { useState } from 'react'
import styles from './auth.module.scss'
import LoginImage from '../../assests/login.png';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';
const Login = () => {
   const [email , setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading , setIsLoading] = useState(false);
   const navigate = useNavigate();
   const pUrl = useSelector(selectPreviousURL);
   const redirectUser = () => {
      if(pUrl.includes('cart')){
         return navigate('/cart');
      }else {
         navigate('/');
      }
   }
   const loginUser = (e) => {
      e.preventDefault();
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      //const user = userCredential.user;
      setIsLoading(false);
      toast.success('تم تسجيل الدخول بنجاح');
      redirectUser();
      })
      .catch((error) => {
         setIsLoading(false);
         toast.error(error.message);
      });
   }
   //login with google
   const provider = new GoogleAuthProvider();
   const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
   .then((result) => {
   //const user = result.user;
   toast.success('تم تسجيل الدخول بنجاح');
   redirectUser(); 
   }).catch((error) => {
   toast.error(error.message);
   });
 }
   return (
      <>
      {isLoading && <Loader />}
         <section className={`container ${styles.auth}`}>
         <div className={styles.img}>
            <img src={LoginImage} alt='Login' width='400'/>
         </div>
         <Card>
            <div className={styles.form}>
            
               <h2>تسجيل الدخول</h2>
               <form onSubmit={loginUser}>
                  <input 
                     type='text' 
                     placeholder='ادخل اسم المستخدم' 
                     required
                     value={email}
                     onChange= {(e) => setEmail(e.target.value)}
                     />
                  <input 
                     type='password' 
                     placeholder='ادخل كلمة السر' 
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     />
                  <button type='submit' className='--btn --btn-primary --btn-block'>التسجيل</button>
                  <div className={styles.links}>
                     <Link to='/reset' >هل نسيت كلمة السر ؟</Link>
                  </div>
                  <p>--أو--</p>
               </form>
            
            <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle}>
            <FaGoogle color='#fff' className={styles.space}/> التسجيل بواسطة جوجل
            </button>
            <span className={styles.register}>
               <Link to='/register'>
                  <b>انشاء حساب جديد</b>
               </Link>
            </span>
         </div>
         </Card>
      </section>
      </>
   
   )
}

export default Login
