import React, { useReducer, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useEmailOTPVerifyMutation, useUserRegisterMutation } from '../../slice/api/UserinfoAPI'
import { isErrorWithMessage, isFetchBaseQueryError, registerUserInfoType } from '../../types/types'
import Side_Login from './Side_Login'
type registerInputType = {
    id: number,
    name: string,
    type: string
}
const registerInput: registerInputType[] = [
    {
        id: 1,
        name: "name",
        type: "text"
    },
    {
        id: 2,
        name: "last name",
        type: "text"
    },
    {
        id: 3,
        name: "email",
        type: "email"
    },
    {
        id: 4,
        name: "password",
        type: "password"
    },
]
type propType = {
    setShowModal: React.Dispatch<React.SetStateAction<{
        islogin: boolean;
        isRegister: boolean;
    }>>
}
function Register({ setShowModal }: propType) {
    const [RegisterUser, { isLoading, isSuccess, isError }] = useUserRegisterMutation()
    const [emailVerifyOTP, { }] = useEmailOTPVerifyMutation()
    const [registerDetails, setRegisterdetails] = useState<registerUserInfoType>({ name: "", lname: "", email: "", password: "" } as registerUserInfoType)
    const [otpBox, setOTPBox] = useState<boolean>(false)
    const [inputOTP, setInputOTP] = useState<string>("")
    const [verifyLoader, setIsVerifyLoader] = useState<boolean>(false)
    const [resendMessage, setResendButtonMessage] = useState<string>("")
    const navigate = useNavigate()
    // ================================================Input Hander=========================
    let name;
    async function onInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        name = e.target.name
        const value = e.target.value
        setRegisterdetails({ ...registerDetails, [name]: value })
    }
    async function onOTPInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setInputOTP(e.target.value)
    }
    // =========================================API call handler=======================================
    const onSubmit = Boolean(registerDetails.email) && Boolean(registerDetails.lname) && Boolean(registerDetails.name) && Boolean(registerDetails.password)
    async function onRegisterDetailssubmit() {
        if (onSubmit) {
            try {
                const res = await RegisterUser(registerDetails).unwrap()
                toast.success(res.message, { duration: 3000, position: "bottom-center" })
                if (res.userId) {
                    localStorage.setItem("tempId", res.userId)
                }
                setOTPBox(true)
                setResendButtonMessage("resend")
            } catch (err: unknown) {
                setOTPBox(false)
                if (isFetchBaseQueryError(err)) {
                    if (err.data) {
                        toast.error(JSON.parse(JSON.stringify(err.data)).message, { duration: 3000, position: "bottom-center" })
                    }
                }
                else if (isErrorWithMessage(err)) {
                    toast.error(err.message, { duration: 3000, position: "bottom-center" })
                }
            }
        }
    }
    async function onOTPVerify() {
        if (Boolean(inputOTP)) {
            try {
                const value = localStorage.getItem("tempId")
                if (value) {
                    setIsVerifyLoader(true)
                    const res = await emailVerifyOTP({
                        userId: value,
                        email: registerDetails.email.toLowerCase().trim(),
                        otp: inputOTP.trim()
                    }).unwrap()
                    toast.success(res, { duration: 2000, position: "bottom-center" })
                    setOTPBox(false)
                    localStorage.removeItem("tempId")
                    setShowModal({ islogin: true, isRegister: false })
                    setRegisterdetails({
                        name: "",
                        lname: "",
                        email: "",
                        password: ""
                    })
                }
            } catch (err) {
                setIsVerifyLoader(false)
                if (isFetchBaseQueryError(err)) {
                    if (err.data) {
                        toast.error(JSON.parse(JSON.stringify(err.data)), { duration: 3000, position: "bottom-center" })
                    }
                }
                else if (isErrorWithMessage(err)) {
                    toast.error(err.message, { duration: 3000, position: "bottom-center" })
                }
            }
            finally {
                setIsVerifyLoader(false)
            }
        }
    }
    return (
        <>
            <div className="wrapper_signup">
                <div className="wrapper_input flex justify-center px-[3rem] items-center flex-col">
                    {
                        registerInput.map((item: registerInputType) => {
                            return <div key={item.id} className="input_fields w-[90%] py-2">
                                <input type={item.type} placeholder={item.name}
                                    className="input w-full  input-sm input- input-bordered input-info"
                                    onChange={onInputHandler}
                                    value={
                                        item.id === 1 ? (registerDetails.name) :
                                            (item.id === 2 ? (registerDetails.lname) :
                                                (item.id === 3) ? (registerDetails.email) :
                                                    (registerDetails.password))
                                    }
                                    name={
                                        item.id === 1 ? ("name") :
                                            (item.id === 2 ? ("lname") :
                                                (item.id === 3) ? ("email") :
                                                    ("password"))
                                    }
                                    required />
                            </div>
                        })
                    }
                </div>
                {/* ==========================================OTP Box======================== */}
                {otpBox && <div className="input_fields  py-2   w-full flex justify-start pl-[4.2rem]">
                    <input type="text" placeholder="OTP" className="input  input-sm  input-bordered input-info w-[5rem] text-center flex justify-center items-center  "
                        minLength={4}
                        maxLength={4}
                        onChange={onOTPInputHandler}
                        value={inputOTP}
                    />
                    <div className="veri-button pl-4">
                        <button
                            onClick={onOTPVerify}
                            disabled={!Boolean(inputOTP) || verifyLoader}
                            className='btn btn-sm'>
                            {verifyLoader ? <Loader width={20} height={20} /> : "verify"}
                        </button>
                    </div>
                </div>}
            </div>
            {/* =========================================Submit button=============================== */}
            <div className="btn_section">
                <div className="btnFsd py-2 px-7">
                    <button className='btn btn-block btn-sm
                     bg-gradient-to-b from-gray-900 to-gray-600 text-[#fff]'
                        disabled={!onSubmit || isLoading}
                        onClick={onRegisterDetailssubmit}
                    >
                        {isLoading ? <Loader width={25} height={25} /> : resendMessage ? resendMessage : "register"}
                    </button>
                </div>
            </div>
            <div className="divider h-[.4rem] font-serif tracking-wider text-[1rem]">via</div>
            <Side_Login />
        </>
    )
}
export default React.memo(Register)