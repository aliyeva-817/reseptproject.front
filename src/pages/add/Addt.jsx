import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductThunk, getProductsThunk } from '../../redux/reducers/productSlice'
import ProductCard from '../../components/cards/ProductCard'
import { useSelector } from 'react-redux'

const Addt = ({filterData}) => {

    const dispatch=useDispatch()

    const data=useSelector(state=> state.products.products)
    const loading=useSelector(state=> state.products.loading)
    const error=useSelector(state=> state.products.error)

    useEffect(()=>{
        dispatch(getProductsThunk())
    },[dispatch])

    const handleDelete=(id)=>{
        dispatch(deleteProductThunk(id))
    }



    if(loading) return <span>loading</span>
    if(error) return <span>xeta oldu</span>


  return (
    <div>
        { filterData && filterData.map(item=>(
            <div>
                <ProductCard key={item.id} item={item} handleDelete={handleDelete}/>
            </div>
        ))}
    </div>
  )
}

export default Addt