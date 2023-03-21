import React from 'react';
import ReactDom from 'react-dom';
import loaderImg from '../../assests/giphy.gif';
import styles from './Loader.module.scss';

const Loader = () => {
  return ReactDom.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
         <img src={loaderImg} alt='loading....' style={{width : '15rem'}}/>
      </div>
    </div>,
    document.getElementById('loader')
  ) 
}

export default Loader
