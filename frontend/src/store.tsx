import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { apiSlice } from "./slice/api/apiSlice"
import { newApiSlice } from "./slice/api/CartAPI"
import { UserDetaisAPI } from "./slice/api/UserinfoAPI"
import ItemReducer from "./slice/ItemSlice/Items"
import { productsItemReducer } from "./slice/ItemSlice/Items"
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [newApiSlice.reducerPath]: newApiSlice.reducer,
        [UserDetaisAPI.reducerPath]: UserDetaisAPI.reducer,
        item: ItemReducer,
        productsItemsLoad: productsItemReducer
    },
    middleware: (gdm) =>
        gdm().concat(apiSlice.middleware, newApiSlice.middleware, UserDetaisAPI.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const ItemSelector = (state: RootState) => state.item
export const productItems = (state: RootState) => state.productsItemsLoad.products
export const isAuthenticate = (state: RootState) => state.productsItemsLoad.isAuth
export const ItemListInCart = (state: RootState) => {
    return {
        totalAmout: state.item.amount,
        totalItem: state.item.totalItem,
        itemsList: state.item.items
    }
}