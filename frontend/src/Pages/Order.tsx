import { useEffect, useMemo, useState } from 'react'
import OrderItems from '../Components/Orders/OrderItems'
import { useGetOrdersMutation } from '../slice/api/CartAPI'
import { orderItemType } from '../types/types'
import React from 'react'
import { isAuthenticate, useAppSelector } from '../store'
import { Oval } from 'react-loader-spinner'
function Order() {
    const isAuth = useAppSelector(isAuthenticate)
    const [getOrders, { isLoading, isSuccess }] = useGetOrdersMutation()
    const [orderItems, setOrderItems] = useState<orderItemType[]>([])
    const getOrderlist = useMemo(() => {
        (async function () {
            try {
                if (isAuth.isHaveId) {
                    const res: orderItemType[] | string = await getOrders({ userId: isAuth.isHaveId }).unwrap()
                    if (typeof res !== "string") {
                        setOrderItems(res)
                    }
                }
            } catch (err) {
            }
        })()
    }, [])
    useEffect(() => {
        getOrderlist
    }, [])
    return (
        <div className='pt-[4rem] px-[10rem] bg-[#d2dde7] pb-2 mobile:px-2 wide:px-2'>
            <header className="previuos_items text-lg font-serif bg-[#f5f2f2] rounded-sm shadow-md py-2 px-4">
                <p className='tracking-wider'>Orders</p>
            </header>
            <div className="mt-2 mobile:w-full wide:w-full">
                {
                    isLoading ? (
                        <div className="loader flex justify-center items-center h-[calc(100vh-9rem)]">
                            <Oval
                                height={50}
                                width={50}
                                color="#0404FC"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#FFFFFF"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    ) :
                        (
                            orderItems.length > 0 ? orderItems.map((item: orderItemType, index: number) => {
                                return <OrderItems key={index} item={item} />
                            }) :
                                <div className="not_found mt-[3rem] flex justify-center">
                                    <p className='text-[1.3rem] font-serif tracking-wider'>no order found</p>
                                </div>
                        )
                }
            </div>
        </div>
    )
}
export default React.memo(Order)