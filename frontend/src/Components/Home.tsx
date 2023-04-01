import React, { useMemo, useEffect, useState, Suspense, lazy } from 'react'
import { ItemType } from '../types/types'
import Header from './Header'
import { Navigate, Route, Routes, redirect } from "react-router-dom"
import { Socket } from 'socket.io-client';
import { ErrorBoundary } from 'react-error-boundary';
import HomePage from '../Pages/HomePage';
const Cart = lazy(() => import('../Pages/Cart'))
const Order = lazy(() => import('../Pages/Order'))
const Profile = lazy(() => import('../Pages/Profile'))
const PlaceOrder = lazy(() => import('./Orders/PlaceOrder'))
const Payment_Success = lazy(() => import('./Orders/Payment_Success'))
const Payment_failure = lazy(() => import('./Orders/Payment_failure'))
import PageNotFound from './PageNotFound'
import { isAuthenticate, productItems, useAppDispatch, useAppSelector } from '../store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
import Login from './LoginRegister/Login'
import Protected from '../Auth/Protected'
import axios from 'axios'
import { MdImportantDevices } from 'react-icons/md'
import { ComponentLoader } from '../loader/Loader'
import ErrorFallback from './ErrorFallback';
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
                    const res = await axios.get("/api/v1/static/profile", {
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
            <Header setShowLoginModal={setShowLoginModal} setItemList={setItemList} itemList={itemList} isAuthenticateUser={isAuthenticateUser} />
            {ShowLoginModal && <Login setShowLoginModal={setShowLoginModal} />}
            <Routes>
                {isAuthenticateUser ?
                    (
                        <>
                            <Route path='/success_payment' element={
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <Suspense fallback={<ComponentLoader />}>
                                        <Payment_Success />
                                    </Suspense>
                                </ErrorBoundary>
                            } />
                            <Route path='/failure' element={
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <Suspense fallback={<ComponentLoader />}>
                                        <Payment_failure />
                                    </Suspense>
                                </ErrorBoundary>
                            } />
                            <Route path='/place/order' element={
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <Suspense fallback={<ComponentLoader />}>
                                        <PlaceOrder socket={socket} />
                                    </Suspense>
                                </ErrorBoundary>
                            } />
                            <Route path='/profile' element={
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <Suspense fallback={<ComponentLoader />}>
                                        <Profile socket={socket} profileImageURL={profileImageURL} />
                                    </Suspense>
                                </ErrorBoundary>
                            } />
                            <Route path='/orders' element={
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <Suspense fallback={<ComponentLoader />}>
                                        <Order />
                                    </Suspense>
                                </ErrorBoundary>
                            } />
                            <Route path='/cart' element={
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <Suspense fallback={<ComponentLoader />}>
                                        <Cart sidebar={true} finalTotalAmount={false} />
                                    </Suspense>
                                </ErrorBoundary>
                            } />
                        </>
                    ) : <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                }{
                }
                <Route path='*' element={<PageNotFound />} />

                <Route path='/' element={
                    <HomePage isAuthenticateUser={isAuthenticateUser} setShowLoginModal={setShowLoginModal} error={error} isError={isError} isLoading={isLoading} data={data} isSuccess={isSuccess} />
                }
                />
            </Routes>
        </div >
    )
}
export default Home
