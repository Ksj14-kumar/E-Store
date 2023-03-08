import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import Cart from '../../Pages/Cart'
import Address from '../ProfileInfo/Address'
import Payment from './Payment'
type propType = {
    socket: Socket
}
function PlaceOrder({ socket }: propType) {
    const [showAddressDeatils, setAddressDetails] = useState<boolean>(false)
    const [showOrderSummary, setShowOrderSummary] = useState<boolean>(false)
    const [showPaymentOption, setPaymentOption] = useState<boolean>(false)
    return (
        <div className='pt-[4rem] px-[5rem] bg-[#dbe3ee] wide:px-0 mobile:px-0'>
            <div className="acrrodian_1 bg-[#e5e8eb] rounded-md px-1 py-3 wide:px-1 wide:w-full h-full">
                <div className="accordian_list mb-2">
                    <header
                        onClick={() => {
                            setAddressDetails(!showAddressDeatils)
                            if (showOrderSummary) {
                                setShowOrderSummary(false)
                            }
                            if (showPaymentOption) {
                                setPaymentOption(false)
                            }
                        }}
                        className='bg-[#bfcbdf] py-2 pl-2 rounded-md  cursor-pointer font-serif tracking-wider text-lg flex items-center'> <p className='text-[1.3rem] font-semibold text-[#e00a11] p-1 px-2  rounded-full bg-[#09b0da] flex justify-center items-center mr-2'>1.</p> Address Details</header>
                    <AnimatePresence>
                        {showAddressDeatils &&
                            <motion.div
                                exit={{ opacity: 0 }}
                                className="dropdown_box px-[3rem] py-2 mobile:px-[0px] wide:px-[5px]">
                                <Address sidebar={false} socket={socket} />
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <div className="accordian_list mb-2">
                    <header
                        onClick={() => {
                            setShowOrderSummary(!showOrderSummary)
                            if (showAddressDeatils) {
                                setAddressDetails(false)
                            }
                            if (setPaymentOption) {
                                setPaymentOption(false)
                            }
                        }}
                        className='bg-[#bfcbdf] py-2 pl-2 rounded-md  cursor-pointer font-serif tracking-wider text-lg flex items-center'> <p className='text-[1.3rem] font-semibold text-[#e00a11] p-1 px-2  rounded-full bg-[#09b0da] flex justify-center items-center mr-2'>2.</p> Order Summary</header>
                    <AnimatePresence>
                        {showOrderSummary &&
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: .5, type: "tween" }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="dropdown_box px-[3rem] py-2 wide:px-[5px] mobile:px-[5px]">
                                <Cart sidebar={false} finalTotalAmount={false} />
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <div className="accordian_list h-full">
                    <header
                        onClick={() => {
                            setPaymentOption(!showPaymentOption)
                            if (showAddressDeatils) {
                                setAddressDetails(false)
                            }
                            if (showOrderSummary) {
                                setShowOrderSummary(false)
                            }
                        }}
                        className='bg-[#bfcbdf] py-2 pl-2 rounded-md  cursor-pointer font-serif tracking-wider text-lg flex items-center'> <p className='text-[1.3rem] font-semibold text-[#e00a11] p-1 px-2  rounded-full bg-[#09b0da] flex justify-center items-center mr-2'>3.</p> Payment</header>
                    <AnimatePresence>
                        {showPaymentOption &&
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: .5, type: "tween" }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="dropdown_box md:px-[3rem]  py-2 h-full">
                                <Cart sidebar={false} finalTotalAmount={true} />
                                <div className="payment_methods">
                                    <Payment/>
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
export default PlaceOrder