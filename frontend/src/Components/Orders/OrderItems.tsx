import { motion } from "framer-motion"
import { orderItemType, deliveryItemsTypes } from "../../types/types"
import DeliveryItems from "./DeliveryItems"
import DeliveryStatus from "./DeliveryStatus"
import React from 'react';
import OrderDeliveryAddress from "./OrderDeliveryAddress"
type propType = {
    item: orderItemType
}
function OrderItems({ item }: propType) {
    return (
        <motion.div className="items flex bg-[#f9f5f5] rounded-md justify-between items-center p-2 mb-2 cursor-pointer wide:w-full mobile:flex-col mobile:justify-between"
            initial={{ scale: 1 }}
            // whileHover={{ scale: 1.1 }}
            transition={{ duration: .5, type: "tween", ease: "easeInOut" }}
            data-aos="fade-up"
            data-aos-duration="4000"
        >
            <div className="items w-full">
                <div className="wrappe">
                    <div className="wrappe_items flex flex-wrap gap-2 mobile:justify-center">
                        {
                            item.items.map((item: deliveryItemsTypes, index: number) => {
                                return <DeliveryItems index={index} item={item} />
                            })
                        }
                    </div>
                    <div className="wrapper md:flex justify-center items-center  w-full mobile:flex-col wide:flex-col">
                        <div className="left flex-[6] wide:flex-[0]">
                            <OrderDeliveryAddress address={item} name={item} phone={item} />
                        </div>
                        <div className="right flex-[6] wide:flex-[0] h-[10rem] flex flex-col justify-center ">
                            <DeliveryStatus time={item.time} price={item.amount} paymentStatus={item.paymentStatus} deliveryStatus={item.deliveryStatus} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
export default React.memo(OrderItems)