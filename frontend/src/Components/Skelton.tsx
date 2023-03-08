function Skelton() {
    return (
        <div className='w-full bg-[#d0cccc] flex  justify-center gap-2 py-3 min-h-full px-2 flex-wrap'>
            {[1, 2, 4, 5,5,6,7,7].map((item) => {
                return (
                    <>
                        <div className="card w-64 mobile:w-full bg-base-100 shadow-xl px-2 pb-2 py-2">
                            <div className="shadow rounded-md h-[16rem] w-full animate-pulse bg-[#c0baba] ">
                            </div>
                            <div className="card-body bg-[#f2efef] rounded-md flex justify-center">
                                <h2 className="card-title text-center text-[.9rem]"></h2>
                                <div className="button_Wrapper flex justify-evenly w-full gap-x-2">
                                    <button className="btn w-[7rem] border-none btn-sm animate-pulse bg-[#9f9b9b] h-[2.5rem]"></button>
                                    <button className="btn w-[7rem]  border-none btn-sm animate-pulse bg-[#9f9b9b] h-[2.5rem]"></button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}
export default Skelton