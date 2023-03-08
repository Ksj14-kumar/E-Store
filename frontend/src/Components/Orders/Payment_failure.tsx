function Payment_failure() {
    return (
        <div className='pt-[3rem]'>
            <div className="wrapper   w-full  p-[10rem] flex justify-center items-center">
                <div className="failure_ h-[10rem] md:w-[70%] w-full flex justify-center items-center bg-[#b5b0e3cf] rounded-md flex-col">
                    <p className='text-[1.8rem]  font-serif text-[#ffffff] tracking-wider flex justify-center items-center'>Transaction Failed</p>
                    <p 
                    onClick={()=>{
                        window.location.href="/"
                    }}
                    className='text-[1.2rem]  font-serif text-[#c00404] tracking-wider underline cursor-pointer'>Back to Home</p>
                </div>
            </div>
        </div>
    )
}
export default Payment_failure