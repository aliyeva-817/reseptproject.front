import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../components/layout/Layout'
import Home from '../pages/home/Home'
import Add from '../pages/add/Add'
import Basket from '../pages/basket/Basket'
import Favori from '../pages/favori/Favori'
import NotFound from '../pages/notFound/NotFound'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/add' element={<Add/>}/>
            <Route path='*' element={<NotFound/>}/>

        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router