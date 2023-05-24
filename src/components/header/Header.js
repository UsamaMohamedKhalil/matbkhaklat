import React, { useEffect, useState } from "react";
import styles from './Header.module.scss';
import { Link , NavLink} from "react-router-dom";
import {FaShoppingCart , FaTimes, FaUserCircle } from 'react-icons/fa';
import {HiOutlineMenuAlt3 } from 'react-icons/hi';
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER , REMOVE_ACTIVE_USER} from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice";
const Logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2><span>level up</span></h2>
    </Link>
  </div>
)


const Header = () => {
  const [showMenu , setShowMenu] = useState(false);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const [scrollPage,setScrollPage] = useState(false);
  const [displayName , setDisplayName ] = useState('');
  const dispatch = useDispatch();

  const Cart = (
    <span className={styles.cart}>
      <Link to='/cart'>
        مشترياتك
        <FaShoppingCart size={20}/>
        <p>{cartQuantity}</p>
      </Link>
    </span>
  )
  

  const fixNavBar = () => {
    if(window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  }
  window.addEventListener('scroll', fixNavBar)


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const hideMenu = () => {
    setShowMenu(false);
  }

  const navigate = useNavigate();
  const logoutUser = () => {
  signOut(auth).then(() => {
    toast.success('تم الخروج بنجاح');
    navigate('/');
  }).catch((error) => {
    toast.error(error.message);
  });
}
  useEffect(()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY());
  },[])
  // Monitor currently sign in user
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        }else{
          setDisplayName(user.displayName);
        }


        dispatch(SET_ACTIVE_USER({
          email : user.email,
          userName: user.displayName ? user.displayName: displayName,
          userID : user.uid,
        }));
      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  },[dispatch,displayName])
  const activeLink = ({isActive}) => (
    isActive ? `${styles.active}` : ""
  )
  
  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {Logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} 
            ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}` }
            onClick={hideMenu}></div>
            <ul onClick={hideMenu}>
              <li className={styles['logo-mobile']}>
                {Logo}
                <FaTimes size={22} color='#fff' onClick={hideMenu} />
              </li>
              <AdminOnlyLink>
              <Link to='/admin/home'>
              <li>
                <button className="--btn --btn-primary ">
                  الأدمن
                </button>
              </li>
              </Link>
              </AdminOnlyLink>

              <li>
                <NavLink to='/' className={activeLink}>
                  level up 
                </NavLink>
              </li>
              <li>
                <NavLink to='/contact' className={activeLink}>تواصل معنا</NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink className={activeLink} to='/login'>تسجيل الدخول</NavLink >
                </ShowOnLogout>
                <ShowOnLogin>
                  <a href="#home" style={{color:"#ff7722"}}>
                    <FaUserCircle size={16} />
                    {displayName}  
                  </a>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink className={activeLink} to='/order-history'> طلباتك </NavLink >
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink className={activeLink} 
                  to='/' onClick={logoutUser}> الخروج </NavLink >
                </ShowOnLogin>
              </span>
              {Cart}
            </div>
            
        </nav>
        <div className={styles["menu-icon"]}>
          {Cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
