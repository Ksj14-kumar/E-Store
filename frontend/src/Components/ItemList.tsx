import { ItemType } from '../types/types'
import React from 'react';
type propType = {
    item: ItemType,
    addItems: (item: ItemType) => void,
    removeItemFromCart: (id: Pick<ItemType, "id"> & { status: number }) => void,
    itemDeleteLoader: { id: number, active: boolean },
    AddItemLoader: { id: number, active: boolean },
    RemoveITemLoader: { id: number, active: boolean },
}
function ItemList({ item, addItems, itemDeleteLoader,RemoveITemLoader, removeItemFromCart, AddItemLoader }: propType) {
    return (
        <div className="items_details p-3 py-2">
            <div className="item_1 flex mobile:flex-col large:flex-col bg-[#eeececcc] rounded-md">
                <div className="image flex-[4] h-full rounded-md p-2">
                    <div className="avatar">
                        <div className="w-full rounded-md shrink-0">
                            <img src={item.image} className="shrink-0" />
                        </div>
                    </div>
                </div>
                <div className="item_details  flex-[9] px-3">
                    <h1 className="title  py-2 cursor-pointer text-[#060606] text-[1.4rem] font-serif pl-[2rem]">{item.title}</h1>
                    <div className="description pl-[2rem] pb-4">
                        <p>{item.description}</p>
                    </div>
                    <div className="price py-2 border-[1px] border-x-0 border-[#bab2b2]  border-solid cursor-pointer text-[#0b0b0b] text-[1rem]  font-serif pl-[2rem]"><span>&#8377;</span>{Math.round(item.price)}</div>
                    <div className="delete_item py-3 pl-[2rem]  border-b-[1px] border-x-0 border-[#bab2b2]  border-solid border-t-none">
                        <button
                            disabled={RemoveITemLoader.id===item.id&&RemoveITemLoader.active}
                            className='text-[1rem]   btn btn-sm px-4 bg-[#f40404c3] rounded-md border-none'
                            onClick={() => {
                                removeItemFromCart({ id: item.id, status: 2 })
                            }}
                        >Remove</button>
                    </div>
                    <div className="button_card flex pl-[2rem] py-2">
                        <button
                            disabled={AddItemLoader.id === item.id && AddItemLoader.active}
                            type="button"
                            role="button"
                            className='text-[1.2rem] rounded-r-none btn btn-sm px-4 bg-[#e4980b] rounded-md border-none'
                            onClick={() => {
                                addItems(item)
                            }}
                        >+</button>
                        <p className='text-[#0d0d0d] bg-[#fff] flex justify-center items-center px-[20px]'>{item.count}</p>
                        <button
                            role="button"
                            type='button'
                            disabled={itemDeleteLoader.id === item.id && itemDeleteLoader.active}
                            className='text-[1.2rem] rounded-l-none px-4 btn btn-sm bg-[#4dea04] rounded-md border-none'
                            onClick={() => {
                                removeItemFromCart({ id: item.id, status: 1 })
                            }}
                        >-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(ItemList)