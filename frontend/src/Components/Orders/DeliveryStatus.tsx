import { MdCheck } from "react-icons/md"
import { orderItemType } from "../../types/types"
import {MdCropSquare} from "react-icons/md"
import React from 'react'
type propType = {
    time: number,
    price: number,
    paymentStatus: string,
    deliveryStatus:string
}
function DeliveryStatus({ time, price, paymentStatus,deliveryStatus }: propType) {
    const [day,month,dayInNum,year]= new Date(time).toString().split(" ")
    return (
        <div className="status bg-[#d5d6decc] md:rounded-tl-none rounded-t-none rounded-bl-none  text-[#000]  py-[1.4rem] mt-[.2rem] md:mt-2 px-4 rounded-md w-full justify-center flex  flex-col items-center md:rounded-tr-md">
            <p className='online font-serif  relative flex items-center gap-x-3 mobile:text-sm py-1'>
                <div className="div rounded-full bg-[#20ed05] w-[10px] h-[10px]"></div>
                Deliverd on {month} {dayInNum}
            </p>
            <p className="text-[1.4rem] font-sans font-medium  px-3 flex items-center bg-[#878d8c] p-[5px] rounded-md mb-2 gap-1">Total: <span className="text-[#4df106]"><span className='mr-1'>&#8377;</span>{price}</span>
            {
                paymentStatus==="paid"&&
                <MdCheck className="text-[#fff] rounded-full ml-1 bg-[#0fd405] border" />
            }
            </p>
            <p className="text-md font-sans italic flex items-center gap-2 py-2 text-[#fff] bg-[#6e0202] px-4 rounded-md">
                Delivery status:
                <p className="bg-red-500 border w-[1rem] h-[1rem] rounded-full"></p> {deliveryStatus}
            </p>
        </div>
    )
}
export default React.memo(DeliveryStatus)