import React from 'react'
import styles from '../styles'

const CustumButton = ({title,handelClick,restStyles}) => {
  return (
   <button type='button' 
   className={`${styles.btn} ${restStyles}`}
   onClick={handelClick}>
    {title}

   </button>
  )
}

export default CustumButton
