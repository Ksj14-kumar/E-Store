import React from 'react'
import { BsCartXFill } from 'react-icons/bs'
function EmptyCart() {
    return (
        <div className='pt-[3rem] bg-[#d4d0d0] w-full h-screen md:p-[10rem]'>
            <div className="wrapper  h-[calc(100vh-15rem)] flex flex-col justify-center items-center">
                <h1 className='text-[1.8rem] font-medium tracking-wider py-[2rem]'>Cart is Empty</h1>
                <div className="icons_wrapper ">
                    <BsCartXFill className="text-[17.7rem] text-[#dd0707] mobile:text-[10rem]"/>
                </div>
            </div>
        </div>
    )
}
export default EmptyCart