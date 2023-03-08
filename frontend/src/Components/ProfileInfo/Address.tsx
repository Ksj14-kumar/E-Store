import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { addressType, allAddressType, isErrorWithMessage, isFetchBaseQueryError, setActiveAddressType, socketAddressType, userAddressesType } from '../../types/types'
import { toast } from 'react-hot-toast'
import { useAddNewAddressMutation, useDeleteAddressMutation, useGetAllAddressMutation, useSetActiveAddressMutation } from '../../slice/api/UserinfoAPI'
import Loader, { OvalLoader } from '../../loader/Loader'
import AddressList from './AddressList'
import { Socket } from 'socket.io-client'
import { isAuthenticate, useAppSelector } from '../../store'
import { Oval } from 'react-loader-spinner'
const gridTemplate: addressType[] = [
    {
        id: 1,
        placeHolder: "name"
    },
    {
        id: 2,
        placeHolder: "pincode"
    },
    {
        id: 3,
        placeHolder: "locality"
    },
    {
        id: 4,
        placeHolder: "address"
    },
    {
        id: 5,
        placeHolder: "city"
    },
    {
        id: 6,
        placeHolder: "state"
    },
    {
        id: 7,
        placeHolder: "mobile(12 digit)"
    },
]
type propType = {
    sidebar: boolean,
    socket: Socket
}
export interface currentAddressType {
    id: string,
    userId: string,
}
function Address({ sidebar, socket }: propType) {
    const isAuth = useAppSelector(isAuthenticate)
    const [newAddressComponent, setNewAddressComponent] = useState<boolean>(false)
    const [loader, setloader] = useState<boolean>(false)
    const [currentAddress, setCurrentAddress] = useState<currentAddressType>({ id: "", userId: "" })
    const [addAddress, { }] = useAddNewAddressMutation()
    const [laodAllAddress, { isLoading, isError, error }] = useGetAllAddressMutation()
    const [listOfAddress, setListOfAllAddress] = useState<allAddressType[]>([])
    const [setActiveAddress, { }] = useSetActiveAddressMutation()
    const [deleteAddressByAPI, { }] = useDeleteAddressMutation()
    const [addressDeatils, setAddressDeatils] = useState<userAddressesType>({
        name: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        mobile: ""
    })
    let name: string;
    function onInputHandlerChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        name = e.target.name
        const value: string = e.target.value
        setAddressDeatils(pre => {
            return {
                ...pre,
                [name]: value
            }
        })
    }
    const onSubmit = Boolean(addressDeatils.name) && Boolean(addressDeatils.state) && Boolean(addressDeatils.pincode) && Boolean(addressDeatils.mobile) && Boolean(addressDeatils.locality) && Boolean(addressDeatils.city) && Boolean(addressDeatils.address)
    // ===========================================Call Back functions==================================
    const laodAllAddressFromDB = useMemo(() => {
        (async function load() {
            try {
                if (isAuth.isHaveId) {
                    const res: allAddressType[] = await laodAllAddress({ userId: isAuth.isHaveId }).unwrap()
                    setListOfAllAddress(res)
                }
            } catch (err) {
                console.warn(err)
            }
        })()
    }, [])
    async function onAddressSubmit() {
        if (addressDeatils.pincode.length !== 6) {
            toast.error("pincode is invalid", { duration: 2000, position: "bottom-center" })
            return
        }
        if (onSubmit && addressDeatils.mobile.length === 12) {
            try {
                if (isAuth.isHaveId) {
                    if (socket.connected) {
                        socket.emit("newAddress", { ...addressDeatils, userId: isAuth.isHaveId })
                    }
                    else {
                        setloader(true)
                        const res = await addAddress({ ...addressDeatils, userId: isAuth.isHaveId }).unwrap()
                        toast.success(res, { duration: 2000, position: "bottom-center" })
                        setAddressDeatils({
                            name: "",
                            state: "",
                            pincode: "",
                            mobile: "",
                            locality: "",
                            city: "",
                            address: ""
                        })
                    }
                    setAddressDeatils({
                        name: "",
                        state: "",
                        pincode: "",
                        mobile: "",
                        locality: "",
                        city: "",
                        address: ""
                    })
                }
            } catch (err) {
                if (isFetchBaseQueryError(err)) {
                    toast.error(JSON.stringify(err), { duration: 2000, position: "bottom-center" })
                    return
                }
                else if (isErrorWithMessage(err)) {
                    toast.error(err.message, { duration: 2000, position: "bottom-center" })
                    return
                }
                setloader(false)
            }
            finally {
                setloader(false)
            }
        }
        else {
            toast.error("Mobile number with country code", { duration: 2000, position: "bottom-center" })
        }
    }
    async function onActiveAddressHandler(params: setActiveAddressType) {
        try {
            await setActiveAddress({ userId: params.userId, addressId: params.addressId }).unwrap()
        } catch (err) {
            console.warn(err)
        }
    }
    async function deleteAddress(params: setActiveAddressType) {
        try {
            const removeAddress = listOfAddress.filter((item) => item._id !== params.addressId)
            setListOfAllAddress(removeAddress)
            const res = await deleteAddressByAPI({ userId: params.userId, addressId: params.addressId }).unwrap()
        } catch (err) {
            console.warn(err)
        }
    }
    // ====================================================Effects Hooks========================================
    useEffect(() => {
        laodAllAddressFromDB
    }, [])
    useEffect(() => {
        (async function () {
            try {
                await setActiveAddress({ userId: currentAddress.userId, addressId: currentAddress.id }).unwrap()
            } catch (err) {
                console.warn(err)
            }
        })()
    }, [currentAddress.id])
    // ==========================================================RealTime Address list===========================
    useEffect(() => {
        socket.on("message", (value: socketAddressType) => {
            if (value.status !== 200) {
                if (typeof value.msg === "string") {
                    toast.error(value.msg, { duration: 2000, position: "bottom-center" })
                }
            }
            if (value.status === 200) {
                if (typeof value.msg !== "string") {
                    setListOfAllAddress(value.msg.reverse())
                    toast.success("added", { duration: 2000, position: "bottom-center" })
                }
            }
        })
    }, [socket])
    return (
        <div className={`right_side flex-[9] bg-[#bbcade] rounded-md py-3  md:overflow-y-auto`} id="addressScrollbar">
            {sidebar ?
                <header
                    className='text-[1.3rem] font-serif pl-8 tracking-wider'>
                    Manage Address
                </header> : ""}
            <section className='add new address px-3 py-3'>
                <button className='btn btn-block btn-sm bg-[#025b87]'
                    onClick={() => {
                        setNewAddressComponent(!newAddressComponent)
                    }}
                >+ add new address
                </button>
            </section>
            <main className="update px-3 mobile:px-1">
                <AnimatePresence>
                    {
                        newAddressComponent && <motion.section
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: .4 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className='new addres box drop-shadow-lg bg-[#a1b5cf] border border-solid border-[#a1b5cf] px-2 mobile:px-0 rounded-md  py-[1rem] gap-y-2 mb-2'>
                            <div className="wrapper grid md:grid-cols-2 mobile:grid-cols-1">
                                {
                                    gridTemplate.map((item) => {
                                        return (
                                            <div className="name py-2 px-[1.4rem]">
                                                {
                                                    item.id !== 4 ?
                                                        (
                                                            item.id === 7 ?
                                                                (
                                                                    <>
                                                                        <div className="wrapper_mobile_verify">
                                                                            <input type="tel"
                                                                                className='py-2 font-serif tracking-wider rounded-md indent-3 w-full'
                                                                                placeholder={item.placeHolder}
                                                                                name={"mobile"}
                                                                                onChange={onInputHandlerChange}
                                                                                id=""
                                                                                minLength={12}
                                                                                maxLength={12}
                                                                                value={
                                                                                    item.id === 7 ? addressDeatils.mobile : ""
                                                                                }
                                                                            />
                                                                            <p className='pl-4 text-sm py-1 tracking-wider text-[#e40c0c] font-serif'>with country code</p>
                                                                            <div className="verify flex items-center">
                                                                                <div className="input_otp py-2 pl-3">
                                                                                    <input
                                                                                        type="text"
                                                                                        name=""
                                                                                        id=""
                                                                                        disabled
                                                                                        className='py-1 font-serif tracking-wider rounded-md indent-3 w-[5rem]'
                                                                                    />
                                                                                </div>
                                                                                <div className="button pl-4">
                                                                                    <button
                                                                                        disabled={true}
                                                                                        className='btn btn-sm'>verify</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <input
                                                                            type="text"
                                                                            className='py-2 font-serif tracking-wider rounded-md indent-3 w-full' placeholder={item.placeHolder}
                                                                            id=""
                                                                            value={
                                                                                item.id === 1 ?
                                                                                    addressDeatils.name :
                                                                                    item.id === 2 ?
                                                                                        addressDeatils.pincode :
                                                                                        item.id === 3 ?
                                                                                            addressDeatils.locality :
                                                                                            item.id === 5 ?
                                                                                                addressDeatils.city :
                                                                                                item.id === 6 ?
                                                                                                    addressDeatils.state :
                                                                                                    ""
                                                                            }
                                                                            maxLength={item.id === 2 ? 6 : 100}
                                                                            onChange={onInputHandlerChange}
                                                                            name={
                                                                                item.id === 1 ?
                                                                                    ("name") :
                                                                                    item.id === 2 ?
                                                                                        ("pincode") :
                                                                                        item.id === 3 ?
                                                                                            ("locality") :
                                                                                            item.id === 5 ?
                                                                                                ("city") :
                                                                                                item.id === 6 ?
                                                                                                    ("state") :
                                                                                                    ""
                                                                            }
                                                                        />
                                                                    </>
                                                                )
                                                        ) :
                                                        (
                                                            <textarea
                                                                cols={6}
                                                                rows={4}
                                                                className='w-full  resize-none  py-1 px-2 rounded-md'
                                                                placeholder={item.placeHolder}
                                                                onChange={onInputHandlerChange}
                                                                name="address"
                                                                value={
                                                                    item.id === 4 ?
                                                                        addressDeatils.address
                                                                        : ""
                                                                }
                                                            />
                                                        )
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <div className="get_OTP  w-full py-3 pl-6"
                                >
                                    <button
                                        disabled={true}
                                        className='btn btn-sm '>OTP</button>
                                </div>
                            </div>
                            {newAddressComponent &&
                                <motion.div
                                    className="submit py-3 w-full">
                                    <button
                                        disabled={!onSubmit || loader}
                                        className='btn btn-block btn-sm'
                                        onClick={() => {
                                            onAddressSubmit()
                                        }}
                                    >{
                                            loader ?
                                                <Loader width={25} height={25} /> : "Save"
                                        }</button>
                                </motion.div>}
                        </motion.section>
                    }
                </AnimatePresence>
                <section className="old_addresses">
                    {
                        isError && (
                            <div className="wrapper_error loader_wrapper flex justify-center items-center h-[calc(100vh-10.7rem)]">
                                <p className='text-lg font-medium tracking-wider '>Opps something went wrong</p>
                            </div>
                        )
                    }
                    {
                        isLoading ? (
                            <div className="loader_wrapper flex justify-center items-center h-[calc(100vh-10.7rem)]">
                                <Oval
                                    height={50}
                                    width={50}
                                    color="#FF0303"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#4E31AA"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2} />
                            </div>
                        ) : listOfAddress.map((item: allAddressType) => {
                            return <AddressList key={item._id} item={item} onActiveAddressHandler={onActiveAddressHandler} deleteAddress={deleteAddress} setCurrentAddress={setCurrentAddress} currentAddress={currentAddress} />
                        })
                    }
                </section>
            </main>
        </div>
    )
}
export default Address