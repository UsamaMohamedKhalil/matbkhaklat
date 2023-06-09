import React from "react";
import styles from './Footer.module.scss';

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {year} All Rights Reserved By <span>@DEALERTECH</span>
    </div>
  );
};

export default Footer;
