import React from 'react'
import Header from '../components/Header'
import ProductMenu from '../components/ProductMenu'
import TopProduct from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
        <Header />
        <ProductMenu />
        <TopProduct />
        <Banner />
    </div>
  )
}

export default Home
