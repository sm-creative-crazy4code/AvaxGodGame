import React from 'react'
import styles from '../styles'

const regex = /^[A-Za-z0-9]+$/

const CustumInput = ({label,placeholder,value,handelValueChange}) => {
  return (
    <>
    <label htmlFor='name' className={styles.label}>
     {label}
    </label>
    <input type='text' placeholder={placeholder} value={value} onChange={(e)=>{
        if(e.target.value=="" || regex.test(e.target.value)) handelValueChange(e.target.value)
    }}
    className={styles.input}
    />
    </>
  )
}

export default CustumInput
