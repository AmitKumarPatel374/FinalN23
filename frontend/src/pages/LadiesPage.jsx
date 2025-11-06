import React from 'react'
import { getProductApiByCategory } from '../apis/getProductApiByCategory'
import { fetchProductDataHook } from '../hooks/getProductHook'

const LadiesPage = () => {

  const {data,isPending,error}=fetchProductDataHook("ladies");

  return (
    <div>
      ladies
    </div>
  )
}

export default LadiesPage
