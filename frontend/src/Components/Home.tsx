import React, { useMemo, useEffect, useState } from 'react'
import { ItemType } from '../types/types'
import Header from './Header'
import { Navigate, Route, Routes, redirect } from "react-router-dom"
import Cart from '../Pages/Cart'
import HomePage from '../Pages/HomePage'
import Profile from '../Pages/Profile'
import Order from '../Pages/Order'
import PlaceOrder from './Orders/PlaceOrder'
import { Socket } from 'socket.io-client'
import Payment_Success from './Orders/Payment_Success'
import Payment_failure from './Orders/Payment_failure'
import PageNotFound from './PageNotFound'
import { isAuthenticate, productItems, useAppDispatch, useAppSelector } from '../store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import Login from './LoginRegister/Login'
import Protected from '../Auth/Protected'
import axios from 'axios'
type propType = {
    socket: Socket,
    isLoading: boolean,
    isError: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    isSuccess: boolean
}
function Home({ socket, isLoading, isError, error, isSuccess }: propType) {
    const isAuth = useAppSelector(isAuthenticate)
    const [itemList, setItemList] = useState<ItemType[]>([])
    const [ShowLoginModal, setShowLoginModal] = useState<boolean>(false)
    const data = useAppSelector(productItems)
    const isAuthenticateUser: boolean = Boolean(isAuth.auth) && Boolean(isAuth.isHaveId) && Boolean(isAuth.image)
    const [profileImageURL, setProfileImageUrl] = useState<string | ArrayBuffer | null>(null)
    const profileImage = useMemo(() => {
        (async function () {
            try {
                if (isAuth.image?.endsWith(".png")) {
                    const res = await axios.get(process.env.BACKEND_URL + "/api/v1/static/profile", {
                        responseType: "blob"
                    })
                    const reader = new FileReader()
                    reader.onload = () => {
                        setProfileImageUrl(reader.result)
                    }
                    reader.readAsDataURL(res.data)
                }
                else {
                    if (isAuth.image) {
                        setProfileImageUrl(isAuth.image)
                    }
                }
            } catch (err) {
                console.warn(err)
            }
        })()
    }, [])
    useEffect(() => {
        profileImage
    }, [])
    return (
        <div className='h-full'>
            <Header setShowLoginModal={setShowLoginModal}  setItemList={setItemList} itemList={itemList} isAuthenticateUser={isAuthenticateUser} />
            {ShowLoginModal && <Login setShowLoginModal={setShowLoginModal} />}
            <Routes>
                {isAuthenticateUser ?
                    (
                        <>
                            <Route path='/success_payment' element={<Payment_Success />} />
                            <Route path='/failure' element={<Payment_failure />} />
                            <Route path='/place/order' element={<PlaceOrder socket={socket} />} />
                            <Route path='/profile' element={<Profile socket={socket} profileImageURL={profileImageURL} />} />
                            <Route path='/orders' element={<Order />} />
                            <Route path='/cart' element={<Cart sidebar={true} finalTotalAmount={false} />} />
                        </>
                    ) : <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                }{
                }
                <Route path='*' element={<PageNotFound />} />
                <Route path='/' element={<HomePage isAuthenticateUser={isAuthenticateUser} setShowLoginModal={setShowLoginModal} error={error} isError={isError} isLoading={isLoading} data={data} isSuccess={isSuccess} />} />
            </Routes>
        </div>
    )
}
export default Home
