import { VscHistory } from 'react-icons/vsc'
function HistoryList() {
    return (
        <div className="search_bar_container relative  w-full">
            <div className="wrap absolute mobile:fixed left-0 mobile:top-[3rem]  bg-[#fbfbfb] rounded-b-md w-full max-h-[18rem] px-1 py-1 overflow-y-auto" id="history_Scroll">
                {
                    [1, 2, 4].map((item, index) => {
                        return <div key={index}  className="list_search_items  mb-1 flex  items-center py-1 rounded-md px-2 bg-[#ede8e8] cursor-pointer">
                            <div className="icons  flex-[1] p-1 cursor-pointer">
                                <VscHistory className='text-[1.2rem] text-[#7b7575]' />
                            </div>
                            <div className="search_his  flex-[11] cursor-pointer">
                                <p className='text-lg font-serif tracking-wider truncate'>Mobile</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default HistoryList