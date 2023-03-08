import axios from 'axios'
import React, { useReducer, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { initialState, reducerHandler } from '../../ReducerHookFunction/login_Reducer'
import { useUserLoginMutation } from '../../slice/api/UserinfoAPI'
import { setIsAuth } from '../../slice/ItemSlice/Items'
import { useAppDispatch } from '../../store'
import { isErrorWithMessage, isFetchBaseQueryError } from '../../types/types'
import Side_Login from './Side_Login'
const inputFieldsArray = [
    {
        name: "email",
        id: 1
    },
    {
        name: "password",
        id: 2
    }
]
function LoginComponents() {
    const [loginDetails, dispatch] = useReducer(reducerHandler, initialState)
    const [loginByAPI, { isLoading, isSuccess, error }] = useUserLoginMutation()
    const navigate = useNavigate()
    function onInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "email") {
            dispatch({ type: "email", payload: e.target.value })
        }
        else {
            dispatch({ type: "password", payload: e.target.value })
        }
    }
    const onSave = Boolean(loginDetails.password) && Boolean(loginDetails.email)
    async function onInputDetailsSubmit() {
        if (onSave) {
            try {
                const res = await loginByAPI(loginDetails).unwrap()
                navigate(res)
                toast.success("login success", { duration: 3000, position: "bottom-center" })
                window.location.href= res
            } catch (err) {
                if (isFetchBaseQueryError(err)) {
                    if (err.data) {
                        toast.error(JSON.stringify(err.data), { duration: 2000, position: "bottom-center" })
                    }
                }
                else if(isErrorWithMessage(err)){
                    toast.error(JSON.stringify(err.message), { duration: 2000, position: "bottom-center" })
                }
            }
        }
    }
    return (
        <div>
            <div className="components mb-2">
                <div className="wrapper_  flex flex-col justify-center items-center px-[2rem] py-4">
                    {inputFieldsArray.map((item) => {
                        return (<div key={item.id} className="input_fields w-[90%] py-2">
                            <input
                                onChange={onInputHandler}
                                type="text"
                                placeholder={item.name}
                                name={item.name}
                                // value={loginDetails.}
                                className="input w-full  input-sm input- input-bordered input-info   " />
                        </div>
                        )
                    })}
                </div>
                <footer className="footer px-[2rem]">
                    <button
                        disabled={isLoading || !onSave}
                        className='btn flex bg-[#1f0686] justify-center items-center btn-block btn-sm'
                        onClick={onInputDetailsSubmit}
                    >{isLoading ? <Loader width={25} height={25} /> : "login"}</button>
                </footer>
            </div>
            <div className="divider h-[.4rem] font-serif tracking-wider text-[1rem]">via</div>
            <Side_Login />
        </div>
    )
}
export default React.memo(LoginComponents)