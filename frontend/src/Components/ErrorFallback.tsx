function ErrorFallback() {
    return (
        <div className='pt-4 flex justify-center  items-center h-[calc(100vh-4rem)] mobile:px-4'>


            <div className="wrapper justify-center flex-col">

                <p className='flex jutify-center items-center text-[1.2rem] font-medium tracking-wider flex-wrap break-words p-3 text-center'>
                    Oop's, something error occured
                </p>
                <p className='px-4 text-center text-[1.4rem] font-medium tracking-wider'>try again</p>
            </div>
        </div>
    )
}

export default ErrorFallback