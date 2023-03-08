import { AxiosError } from 'axios';
import EmptyCart from '../Components/EmptyCart';
import FinalPrice from '../Components/RightSideBar/FinalPrice';
import ItemList from '../Components/ItemList';
import { useAddProductMutation, useDeleteItemMutation } from '../slice/api/CartAPI';
import { addItem, decreaseItemCount, removeItem } from '../slice/ItemSlice/Items';
import { isAuthenticate, ItemListInCart, useAppDispatch, useAppSelector } from '../store';
import { CartItemStatusType, ItemType } from '../types/types';
import React, { useState } from 'react'
type propType = {
    sidebar: boolean,
    finalTotalAmount: boolean
}
function Cart({ sidebar, finalTotalAmount }: propType) {
    const isAuth= useAppSelector(isAuthenticate)
    const { totalAmout, totalItem, itemsList } = useAppSelector(ItemListInCart)
    const [itemDeleteLoader,setItemDeleteLoader]= useState<{id:number,active:boolean}>({id:-12,active:false})
    const [AddItemLoader,setAddItemLoader]= useState<{id:number,active:boolean}>({id:-12,active:false})
    const [RemoveITemLoader,setRemoveITemLoader]= useState<{id:number,active:boolean}>({id:-12,active:false})
    const dispatchItem = useAppDispatch()
    const [addProduct, { isLoading, isSuccess, error, isError }] = useAddProductMutation()
    const [popItem, { }] = useDeleteItemMutation()
    const addItemsInCart = async (item: ItemType): Promise<void> => {
        try {
            if(isAuth.isHaveId){
                setAddItemLoader({id:item.id,active:true})
                await addProduct({ item: item, userId:isAuth.isHaveId }).unwrap()
                dispatchItem(addItem(item))
                setAddItemLoader({id:item.id,active:false})
            }
        } catch (err) {
            // TODO:Handle error
            const error = err as AxiosError
            console.log(error)
        }
    }
    const removeItemFromCart = async (itemId: Pick<ItemType, "id"> & { status: number }) => {
        try {
            if (itemId && isAuth.isHaveId) {
                if (itemId.status === 1) {
                    setItemDeleteLoader({id:itemId.id,active:true})
                    await popItem({
                        userId:isAuth.isHaveId,
                        status: 1,
                        params: itemId.id
                    }).unwrap()
                    dispatchItem(decreaseItemCount({ id: itemId.id }))
                    setItemDeleteLoader({id:itemId.id,active:false})
                }
                else {
                    setRemoveITemLoader({id:itemId.id,active:true})
                    await popItem({
                        userId:isAuth.isHaveId,
                        status: 2,
                        params: itemId.id
                    }).unwrap()
                    dispatchItem(removeItem({ id: itemId.id }))
                    setRemoveITemLoader({id:itemId.id,active:false})
                }
            }
        } catch (err) {
            // TODO:// handle this error
            const error = err as AxiosError
            console.log(error)
        }
    }
    const listItem: CartItemStatusType[] = [
        {
            id: 1,
            name: `Price(${totalItem} items)`,
            status: `${Math.round(totalAmout)}`
        },
        {
            id: 2,
            name: "Discount",
            status: "0"
        },
        {
            id: 3,
            name: "Delivery Charges",
            status: "Free"
        }
    ]
    return (
        <>
            {totalItem === 0 ? <EmptyCart /> :
                <div className='pt-[3.7rem]  flex mobile:flex-col mobile:px-0 justify-center px-4 gap-x-2 bg-[#c1cee7] relative mobile:pb-[1rem] rounded-md'>
                    {!finalTotalAmount && <div className="left_side bg-[#d4d0d0] rounded-md flex-[7]">
                        {itemsList.map((item: ItemType, index: number) => {
                            return <ItemList itemDeleteLoader={itemDeleteLoader} removeItemFromCart={removeItemFromCart}  addItems={addItemsInCart} key={index} item={item}  AddItemLoader={AddItemLoader} RemoveITemLoader={RemoveITemLoader}/>
                        })}
                    </div>}
                    {sidebar &&
                        <div className="right_side bg-[#f3f2f2] mobile:mt-[1.6rem] flex-[3] min-h-full  rounded-md mobile:pb-[3rem]">
                            <FinalPrice listItem={listItem} totalAmout={totalAmout} sidebar={sidebar} />
                        </div>
                    }
                    {
                        finalTotalAmount && <div className="right_side bg-[#f3f2f2] mobile:mt-[1.6rem] flex-[3] min-h-full   rounded-md mobile:pb-[3rem] mb-2">
                            <FinalPrice listItem={listItem} totalAmout={totalAmout} sidebar={sidebar} />
                        </div>
                    }
                </div>
            }
        </>
    )
}
export default React.memo(Cart)