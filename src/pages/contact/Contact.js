import React from 'react'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { GoLocation } from "react-icons/go";

import Card from '../../components/card/Card';
import styles from './Contact.module.scss';
const Contact = () => {
  const senEmail = () =>{

  }
  return (
    <section>
    <div className={`container ${styles.contact}`}>
    <h2>تواصل معنا</h2>
        <div className={styles.details}>
          <Card cardClass={styles.card2}>
          <h3>جميع وسائل التواصل</h3>
          <div className={styles.icons}>
            <span>
              <FaPhoneAlt />
              <p>01200940042</p>
            </span>
            <span>
              <FaEnvelope />
              <p>elmatbkhaklat@gmail.com</p>
            </span>
            <span>
              <GoLocation />
              <p>Egy , Alexandria</p>
            </span>
          </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
