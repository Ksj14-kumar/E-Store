import React from 'react'
import { orderItemType } from '../../types/types'
type propType = {
    address: Pick<orderItemType, "address">,
    phone: Pick<orderItemType, "phone">,
    name: Pick<orderItemType, "name">
}
function OrderDeliveryAddress({ address, phone, name }: propType) {
    return (
        <div className="address py-2 bg-[#d5d6decc] mt-2 rounded-tr-none md:rounded-tr-none md:rounded-br-none flex justify-center items-center flex-col md:rounded-tl-md">
            <p className="text-lg font-serif font-medium text-[1.4rem]">On this address</p>
            <div className="address_Wrapper flex justify-center items-center flex-col px-4">
                <p className="text-md font-sans italic font-medium text-lg">{name.name}</p>
                <p className="text-md font-sans italic">{address.address.line1}</p>
                <p className="text-md font-sans italic">{address.address.line2}</p>
                <p className="text-md font-sans italic">{address.address.city}, {address.address.postal_code},{address.address.state}</p>
                <p className="text-md font-sans italic font-medium">Mobile, {phone.phone}</p>
            </div>
        </div>
    )
}
export default React.memo(OrderDeliveryAddress)