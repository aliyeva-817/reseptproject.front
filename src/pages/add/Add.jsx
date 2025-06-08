import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProductsThunk, postProductThunk } from '../../redux/reducers/productSlice'
import { useFormik } from 'formik'
 import * as Yup from 'yup';
import Addt from './Addt'

const Add = () => {

   const SignupSchema = Yup.object().shape({
   image: Yup.string()
     .min(2, 'Too Short!')
     .required('Required'),
   title: Yup.string()
     .min(1, 'Too Short!')
     .max(70, 'Too Long!')
     .required('Required'),
   price: Yup.string()
     .min(1, 'Too Short!')
     .max(70, 'Too Long!')
     .required('Required'),
 });

  const dispatch=useDispatch()
  const data= useSelector(state=> state.products.products)
  const [searchText, setSearchText]=useState('')
  const [sorted, setSorted]=useState("default")

  useEffect(()=>{
    dispatch(getProductsThunk())
  },[dispatch])


  const filterData = data && data
  .filter((item)=> 
  item.title.toLowerCase().includes(searchText.toLowerCase()))
  .sort((a,b)=>{
    if(sorted == "asc") return Number(a.price) - Number(b.price)
    if(sorted == "desc") return Number(b.price) - Number(a.price)
      return 0
  })

  const formik = useFormik({
     initialValues: {
       image: '',
       title: '',
       price: '',
     },
     validationSchema:SignupSchema,
     onSubmit: values => {
       dispatch(postProductThunk(values))
       formik.resetForm()
     },
   });

  return (
    <div>
      <div>
        <input type="text" name="" id="" value={searchText} onChange={(e)=> setSearchText(e.target.value)} />

        <button onClick={()=> setSorted("asc")}>ASC</button>
        <button onClick={()=> setSorted("desc")}>DESC</button>
        <button onClick={()=> setSorted("default")}>Default</button>

      </div>



      <form onSubmit={formik.handleSubmit}>
       
       <input
         id="image"
         name="image"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.image}
       />
        {formik.touched.image && formik.errors.image && (
        <div>{formik.errors.image}</div>
       )}
       
       <input
         id="title"
         name="title"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.title}
       />
        {formik.touched.title && formik.errors.title && (
        <div>{formik.errors.title}</div>
       )}
       
       <input
         id="price"
         name="price"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.price}
       />
       {formik.touched.price && formik.errors.price && (
        <div>{formik.errors.price}</div>
       )}
       <button type="submit">Submit</button>
     </form>
     <Addt filterData={filterData}/>
    </div>
  )
}

export default Add