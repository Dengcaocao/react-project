import React, { useEffect } from 'react'
import Api from '../../api'

const Home = () => {

  useEffect(() => {
    getData()
  })

  const getData = async () => {
    const res = await Api.getData()
    console.log(res) 
  }

  return (
    <h1>home</h1>
  )
}

export default Home
