import { configureStore, createSlice } from '@reduxjs/toolkit'

import user from './store/userSlice'


let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

let product = createSlice({
    name: 'product',
    initialState: [
        {id : 10, name : 'White and Black', count : 2},
        {id : 11, name : 'Grey Yordan', count : 1}
      ],
      reducers: {
        chnageCount(state, action) {

            let findProduct = state.find(function (x) {
                return x.id === action.payload
              });

              findProduct.count += 1
             
        },

        addProduct(state, action) {

            state.push(action.payload)

            // console.log(state)

        }
      } 
})

export let { chnageCount ,addProduct } = product.actions

export default configureStore({
  reducer: { 

    user : user.reducer,
    stock : stock.reducer,
    product : product.reducer
  }
}) 