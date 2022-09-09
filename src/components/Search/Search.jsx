import React from 'react'
import { ReactComponent as Searchicon } from '../../assets/svg/search.svg'
import { InputWrap } from './Search.styles'

const Search = ({placeholder="Search", icon="",value,handleChange}) => {
  return (
    <InputWrap>
      <label><Searchicon /></label>
      <input value={value} placeholder={placeholder} onChange={handleChange}/> 
    </InputWrap>
  )
}

export default Search