import React from 'react'
function Payment_Success() {
    return (
        <div className='pt-[3rem]'>
            <div className="wrapper   w-full  md:p-[10rem] pt-[10rem] flex justify-center items-center px-[rem]">
                <div className="failure_ h-[10rem] md:w-[70%] w-full  flex justify-center items-center bg-[#e8ebedee] rounded-md flex-col drop-shadow-md align-middle px-2">
                    <p className='text-[1.8rem]  font-serif text-[#08c411] tracking-wider flex justify-center  items-center flex-wrap w-full'>Transaction Success</p>
                    <p
                        onClick={() => {
                            window.location.href = "/"
                        }}
                        className='text-[1.2rem]  font-serif text-[#c00404] tracking-wider underline cursor-pointer'>Back to Home</p>
                </div>
            </div>
        </div>
    )
}
export default Payment_Success