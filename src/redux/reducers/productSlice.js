import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const getProductThunk=createAsyncThunk('/product/get', async()=>{
    const res=await axios.get('')
    return res.data
})

export const getProductsThunk=createAsyncThunk('/products/get', async()=>{
    const res=await axios.get('')
    return res.data
})

export const postProductThunk=createAsyncThunk('/product/post', async(data)=>{
    await axios.post('', data)
    return data
})

export const deleteProductThunk=createAsyncThunk('/product/delete', async(id)=>{
    await axios.delete(`/${id}`)
    return id
})



const productSlice=createSlice({
    name:'products',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProductThunk.fulfilled, (state,action)=>{
            state.loading=false
            state.products=action.payload
        })
        .addCase(getProductThunk.pending, (state)=>{
            state.loading=true
        })
        .addCase(getProductThunk.rejected, (state,action)=>{
            state.loading=false
            state.errors=action.error.message
        })


        .addCase(getProductsThunk.fulfilled, (state,action)=>{
            state.loading=false
            state.products=action.payload
        })
        .addCase(getProductsThunk.pending, (state)=>{
            state.loading=true
        })
        .addCase(getProductsThunk.rejected, (state,action)=>{
            state.loading=false
            state.errors=action.error.message
        })

        .addCase(postProductThunk.fulfilled, (state,action)=>{
            state.loading=false
            state.products.push(action.payload)
        })
        .addCase(deleteProductThunk.fulfilled, (state,action)=>{
            state.loading=false
            state.products=state.products.filter(products=> products._id !== action.payload)
        })
    }
})


export default productSlice.reducer