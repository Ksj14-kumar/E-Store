import { useState } from 'react'
import { useEmailOTPVerifyMutation, useGetOTPBYEmailMutation, useUpdateNameAndLastNameMutation } from '../../slice/api/UserinfoAPI'
import { isErrorWithMessage, isFetchBaseQueryError, nameInfoType } from '../../types/types'
import { toast } from "react-hot-toast"
import Loader from '../../loader/Loader'
import { isAuthenticate, useAppSelector } from '../../store'
function isValidEmail(email: string): boolean {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)
}
function Info() {
    const isAuth = useAppSelector(isAuthenticate)
    const [nameInfo, setNameInfo] = useState<nameInfoType>({ name: "", lname: "" } as nameInfoType)
    const [email, setEmail] = useState<string>("")
    const [mobile, setMobile] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)
    const [genderLoader, setGenderLoader] = useState<boolean>(false)
    const [optEmailBox, setShowOtpEmailBox] = useState<boolean>(false)
    const [EmailOTPLoader, setOTPLoaderEmail] = useState<boolean>(false)
    const [showMobileOtpBox, setShowMobileOTPBox] = useState<boolean>(false)
    const [EmailOTPVerifyLoader, setEmailOTPVerificationLoader] = useState(false)
    const [messageShowOnEmailGetOTPbutton, setResendMessage] = useState("")
    const [getEmailOTP, setEmailOTP] = useState("")
    const [updateUserInfo, { isLoading, isSuccess, error, isError }] = useUpdateNameAndLastNameMutation()
    const [getEmailOTPFromBackend, { }] = useGetOTPBYEmailMutation()
    const [EmailOTPVerify, { }] = useEmailOTPVerifyMutation()
    const onEnableSubmitButton = Boolean(nameInfo.name) && Boolean(nameInfo.lname)
    const enableEmailbutton = Boolean(email)
    const enableMobileButton = Boolean(mobile)
    const enableGenderButton = Boolean(gender)
    let name: string;
    function onInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        name = e.target.name
        const value: string = e.target.value
        setNameInfo({
            ...nameInfo,
            [name]: value
        })
    }
    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }
    function onMobileHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setMobile(e.target.value)
    }
    function onGenderHanlder(e: React.ChangeEvent<HTMLInputElement>) {
        setGender(e.target.value)
    }
    function onEmailOTP(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailOTP(e.target.value)
    }
    function onMobileOTPButton() {
        if (Boolean(mobile)) {
            setShowMobileOTPBox(true)
        }
    }
    async function onInfoChange() {
        const onSubmit = Boolean(nameInfo.name) && Boolean(nameInfo.lname)
        if (onSubmit) {
            try {
                if (isAuth.isHaveId) {
                    setLoader(true)
                    await updateUserInfo({ status: 3, userId: isAuth.isHaveId, name: nameInfo.name, lname: nameInfo.lname }).unwrap()
                    toast.success("update Successfull", { duration: 2000, position: "bottom-center" })
                    setNameInfo({ name: "", lname: "" })
                }
            } catch (err) {
                // TODO:Handle error
                console.warn(err)
                toast.error("something error, reload page", { duration: 2000, position: "bottom-center" })
            }
            finally {
                setLoader(false)
            }
        }
    }
    async function onGenderChange() {
        const onSubmit = Boolean(gender)
        if (onSubmit) {
            try {
                if (isAuth.isHaveId) {
                    setGenderLoader(true)
                    await updateUserInfo({ userId: isAuth.isHaveId, gender, status: 4 })
                    toast.success("update success", { duration: 2000, position: "bottom-center" })
                    setGender("")
                }
            } catch (err) {
                // TODO: Handle error
                console.warn(err)
                toast.error("something error, reload page", { duration: 2000, position: "bottom-center" })
            }
            finally {
                setGenderLoader(false)
            }
        }
    }
    async function onGetEmailOTP() {
        if (Boolean(email)) {
            if (!isValidEmail(email)) {
                toast.error("Invalid Email", { duration: 2000, position: "bottom-center" })
                return
            }
            try {
                if(isAuth.isHaveId){
                    setOTPLoaderEmail(true)
                    const res = await getEmailOTPFromBackend({ userId:isAuth.isHaveId, email }).unwrap()
                    setShowOtpEmailBox(true)
                    setOTPLoaderEmail(false)
                    setResendMessage("Resend")
                    toast.success(res, { duration: 2000, position: "bottom-center" })
                }
            } catch (err) {
                if (isFetchBaseQueryError(err)) {
                    const msg = JSON.parse(JSON.stringify(err.data))
                    toast.error(msg, { duration: 2000, position: "bottom-center" })
                }
                else if (isErrorWithMessage(err)) {
                    toast.error(err.message, { duration: 2000, position: "bottom-center" })
                }
            }
            finally {
                setOTPLoaderEmail(false)
            }
        }
    }
    async function onEmailOTPVerify() {
        if (Boolean(getEmailOTP) && (getEmailOTP.length !== 4)) {
            toast.error("invalid otp", { duration: 2000, position: "bottom-center" })
            return
        }
        if (Boolean(getEmailOTP) && (getEmailOTP.length === 4)) {
            try {
                if (isAuth.isHaveId) {
                    setEmailOTPVerificationLoader(true)
                    const res = await EmailOTPVerify({ otp: getEmailOTP, userId:isAuth.isHaveId, email }).unwrap()
                    toast.success(res, { duration: 2000, position: "bottom-center" })
                    setEmail("")
                    setEmailOTP("")
                    setShowOtpEmailBox(false)
                }
            } catch (err) {
                if (isFetchBaseQueryError(err)) {
                    const msg = JSON.parse(JSON.stringify(err.data))
                    toast.error(msg, { duration: 2000, position: "bottom-center" })
                }
                else if (isErrorWithMessage(err)) {
                    toast.error(err.message, { duration: 2000, position: "bottom-center" })
                }
            }
            finally {
                setEmailOTPVerificationLoader(false)
            }
        }
    }
    return (
        // h-[calc(100vh-3.6rem)]
        <div className="right_side flex-[9] bg-[#bbcade] rounded-md py-3  h-full mobile:mt-2">
            <header className="text-[1.3rem] w-full font-serif indent-8  ">
                <p className="">Personal Info</p>
            </header>
            <main className="info_section">
                <section className="name_lname py-3 w-full indent-8 mobile:indent-0 mobile:px-2">
                    <div className="name py-2 mobile:w-full">
                        <input
                            type="text"
                            name="name"
                            className="py-2 rounded-md indent-4 font-serif tracking-wider w-[40%] drop-shadow-lg mobile:w-full" placeholder="name"
                            onChange={onInputHandler}
                            value={nameInfo.name}
                            id=""
                        />
                    </div>
                    <div className="lname py-2 mobile:indent-0  mobile:w-full">
                        <input
                            type="text"
                            name="lname"
                            className="py-2 drop-shadow-lg rounded-md indent-4 font-serif tracking-wider w-[40%] mobile:w-full"
                            placeholder="last name"
                            id=""
                            onChange={onInputHandler}
                            value={nameInfo.lname}
                        />
                    </div>
                    <div className="butt py-2 mobile:indent-0  mobile:w-full">
                        <button
                            disabled={!onEnableSubmitButton || loader}
                            onClick={() => {
                                onInfoChange()
                            }}
                            className="text-[1rem] btn font-serif bg-[#137703] w-[40%] rounded-md py-2 text-[#e7d9d9] mobile:indent-0  mobile:w-full">{
                                loader ? <Loader width={33} height={33} />
                                    : "Save"
                            }</button>
                    </div>
                </section>
                {/* ===========================================GENDER======================================= */}
                <section className="gender indent-8 py-4">
                    <input type="radio" name="gender"
                        id=""
                        className=""
                        onChange={onGenderHanlder}
                        value="M"
                    /> <span className="text-[1.1rem]">Male
                    </span>
                    <input
                        type="radio"
                        name="gender"
                        id=""
                        className="ml-4"
                        onChange={onGenderHanlder}
                        value="F"
                    /> <span className="text-[1.1rem]">Female</span>
                    <div className="butt py-2">
                        <button
                            disabled={!enableGenderButton || genderLoader}
                            onClick={() => {
                                onGenderChange()
                            }}
                            className="text-[1rem] btn font-serif bg-[#127703] w-[40%] rounded-md py-2  text-[#e7d9d9] btn-sm">
                            {
                                genderLoader ? <Loader width={40} height={24} />
                                    : "Save"
                            }
                        </button>
                    </div>
                </section>
                {/* ==============================================EMAIL================================ */}
                <div className="email w-full py-4 mobile:px-3">
                    <div className="email indent-8 flex item-center pl-8 mobile:flex-col mobile:pl-0">
                        <input
                            type="email"
                            className="py-2 rounded-md  font-serif tracking-wider w-[42%] drop-shadow-lg indent-4 mobile:w-full"
                            name=""
                            placeholder="Email"
                            id=""
                            onChange={onEmailChange}
                            value={email}
                        />
                        <div className="button flex justify-center items-center pl-8 mobile:pl-0 mobile:w-full mobile:mt-2">
                            <button
                                disabled={!enableEmailbutton || EmailOTPLoader}
                                onClick={onGetEmailOTP}
                                className="btn btn-sm bg-[#0380b2]">{enableEmailbutton ? (
                                    EmailOTPLoader ?
                                        <Loader width={30} height={30} /> :
                                        (messageShowOnEmailGetOTPbutton ? "Resend" : "Get OTP")
                                ) : "Get OTP"}</button>
                        </div>
                    </div>
                    {optEmailBox && <div className="verify_email flex pl-[4rem] pt-4 gap-x-6">
                        <div className="smal  flex justify-center">
                            <input type="text" name="" className='py-1 rounded-md   font-serif tracking-wider w-[5rem] drop-shadow-lg text-center'
                                placeholder='OTP'
                                id=""
                                onChange={onEmailOTP}
                                minLength={1}
                                maxLength={4}
                                value={getEmailOTP}
                            />
                        </div>
                        <div className="otp_buton">
                            <button
                                disabled={!getEmailOTP || EmailOTPVerifyLoader}
                                onClick={() => {
                                    onEmailOTPVerify()
                                }}
                                className='btn btn-sm '>
                                {EmailOTPVerifyLoader ?
                                    (<Loader width={30} height={30} />) :
                                    "verify"
                                }</button>
                        </div>
                    </div>}
                </div>
                {/* ========================================MOBILE=============================== */}
                <div className="mobile w-full mobile:flex-col mobile:px-3">
                    <div className="email indent-8 flex item-center pl-8 mobile:pl-0 mobile:flex-col">
                        <input
                            type="email"
                            className="py-2 rounded-md  font-serif tracking-wider w-[42%] drop-shadow-lg indent-4 mobile:w-full"
                            name=""
                            placeholder="mobile"
                            id=""
                            onChange={onMobileHandler}
                            value={mobile}
                        />
                        <div className="button flex justify-center items-center pl-8 mobile:mt-2 mobile:pl-0">
                            <button
                                disabled={!enableMobileButton}
                                onClick={onMobileOTPButton}
                                className="btn btn-sm bg-[#0380b2]">Get OTP</button>
                        </div>
                    </div>
                    {showMobileOtpBox && <div className="verify_mobile flex pl-[4rem] pt-4 gap-x-6">
                        <div className="smal  flex justify-center">
                            <input type="text" name="" className='py-1 rounded-md   font-serif tracking-wider w-[5rem] drop-shadow-lg indent-2' placeholder='OTP' id="" />
                        </div>
                        <div className="otp_buton">
                            <button className='btn btn-sm '>verify</button>
                        </div>
                    </div>}
                </div>
            </main>
        </div>
    )
}
export default Info