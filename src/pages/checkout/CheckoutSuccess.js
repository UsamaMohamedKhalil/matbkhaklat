import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <section>
    <div className='container'>
      <h1>تم استقبال الطلب</h1>
      <p>❤️❤️❤️شكراً لأخيارك لنا</p>
      <br />
        <button className='--btn --btn-primary'>
          <Link to='/order-history'>
          تابع حالة طلبك
          </Link>
        </button>
    </div>
    </section>
  )
}

export default CheckoutSuccess
