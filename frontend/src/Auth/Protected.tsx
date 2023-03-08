import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
type propType = {
    children: React.ReactNode,
    isAuth:boolean
}
function Protected({ children, isAuth }: propType) {
    const navigate = useNavigate()
    if (!isAuth) {
        navigate("/")
    }
    return children?children:<Outlet/>
}
export default Protected