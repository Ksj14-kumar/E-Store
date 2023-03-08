import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CartItemStatusType, ItemType } from '../../types/types'
type propType = {
    listItem: CartItemStatusType[],
    totalAmout: number,
    sidebar: boolean,
}
function FinalPrice({ listItem, totalAmout, sidebar }: propType) {
    const navigate = useNavigate()
    return (
        <>
            <div className="price_details grow-1  py-4 indent-3 pb-2 ">
                <h1 className="uppercase font-serif">price Details</h1>
                <div className="divider my-[5px]"></div>
                {
                    listItem.map((item: CartItemStatusType, index: number) => {
                        return <div key={index} className="price flex justify-between pr-[5rem] pl-4 items-center leading-[3rem]">
                            <p className='text-[1rem] font-serif tracking-wider truncate'>{item.name}</p>
                            <p className={`text-[1rem] font-serif tracking-wider ${(item.id === 3 || item.id === 2) && "text-[#0ba103]"}`}>
                                {item.id===2 && <span>&#8377;</span>}
                                {item.id===1 && <span>&#8377;</span>}
                                {item.status}
                                </p>
                        </div>
                    })
                }
            </div>
            <div className="total_amout px-[1rem] pb-2">
                <div className="wrap border-[2px] py-[.5rem] border-x-0  border-dashed border-[#cac6c6] flex justify-between pr-[4rem]">
                    <h1 className='text-[1.2rem] pl-4  font-medium'>Total Amount</h1>
                    <p className='text-[1.2rem] font-medium'><span>&#8377;</span>{Math.round(totalAmout)}</p>
                </div>
                {sidebar && <div className="payment mt-4">
                    <button
                        onClick={() => {
                            navigate("/place/order")
                        }}
                        className='btn btn-block text-[1.4rem] outline-none border-0 bg-[#18c005] truncate'>Place Order</button>
                </div>}
            </div>
        </>
    )
}
export default React.memo(FinalPrice)