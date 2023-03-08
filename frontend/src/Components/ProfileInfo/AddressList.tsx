import { useEffect } from 'react'
import { IoMdTrash } from "react-icons/io"
import { allAddressType, setActiveAddressType } from '../../types/types'
import { currentAddressType } from './Address'
type propType = {
    onActiveAddressHandler: (d: setActiveAddressType) => void,
    item: allAddressType,
    deleteAddress: (d: setActiveAddressType) => void,
    setCurrentAddress: React.Dispatch<React.SetStateAction<currentAddressType>>,
    currentAddress: currentAddressType
}
function AddressList({
    item,
    deleteAddress,
    setCurrentAddress,
    currentAddress }: propType) {
    useEffect(() => {
        if (item.active) {
            setCurrentAddress({ userId: item.userId, id: item._id })
        }
    }, [item.active])
    return (
        <div className='bg-[#f1ecec] drop-shadow-md border-solid border-[1px] py-2 px-3 rounded-md relative mb-2'>
            <div className="three_dots absolute right-2 top-1 rounded-full p-2 hover:bg-[#d6cfcfaf] cursor-pointer transition-opacity"
                onClick={() => {
                    deleteAddress({ active: true, userId: item.userId, addressId: item._id })
                }}
            >
                <IoMdTrash className='text-[1.4rem] text-[#d20606]' />
            </div>
            <div className="three_dots absolute right-[4rem] top-1 rounded-full  hover:bg-[#d6cfcfaf] cursor-pointer transition-opacity px-1 mobile:hidden wide:hidden">
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <input type="checkbox"
                            onChange={(e) => {
                                console.log(e)
                                setCurrentAddress({ id: item._id, userId: item.userId })
                            }}
                            checked={item._id === currentAddress.id}
                            className="checkbox checkbox-success" />
                    </label>
                </div>
            </div>
            <p className='font-serif tracking-wider flex items-center'><p className=' font-medium mr-4 text-lg'>{item.name}</p> +{item.mobile}</p>
            <div className="address py-1">
                <address className='flex'>
                    {item.address}, {item.pincode}, {item.city}, {item.state}
                    <div className="three_dots flex justify-end right-[4rem] top-1 rounded-full  hover:bg-[#d6cfcfaf] cursor-pointer transition-opacity px-1 md:hidden"
                        onClick={() => {
                        }}
                    >
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <input type="checkbox"
                                    onChange={(e) => {
                                        setCurrentAddress({ id: item._id, userId: item.userId })
                                    }}
                                    checked={item._id === currentAddress.id}
                                    className="checkbox checkbox-success" />
                            </label>
                        </div>
                    </div>
                </address>
            </div>
        </div>
    )
}
export default AddressList