import React from 'react'

export const Input = ({type,id,placeholder,value,handleChange}) => {

  return (
    <input 
        id={id}
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
    />
  )
}
