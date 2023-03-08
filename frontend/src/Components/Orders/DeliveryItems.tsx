import React from 'react'
import { deliveryItemsTypes } from '../../types/types'
type propType = {
    url?: string,
    index: number,
    item: deliveryItemsTypes,
}
function DeliveryItems({ index, item }: propType) {
    return (
        <div key={index} className="item_list  bg-[#e8e2e2d3] items-center justify-center flex flex-col rounded-md p-2">
            <div className="image p-1 bg-[#fcfbfb] rounded-md  shrink-0">
                <img src={item.image} className="w-[8rem] h-[8rem]" alt="img" />
            </div>
            <p className="text-md font-sans text-[1.2rem] text-[#0e0e0e] font-medium py-1"><span>Price:</span> <span className='mr-1'>&#8377;</span>{Math.round(item.price)}</p>
            <p className="text-sm font-sans  text-[#0e0e0e] font-medium py-1"><span>Qty:</span> {item.count}</p>
        </div>
    )
}
export default React.memo(DeliveryItems)