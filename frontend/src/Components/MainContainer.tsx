import { ItemType } from '../types/types'
import Skelton from './Skelton'
import Items from './Items'
type propType = {
    itemsList: ItemType[],
    isLoading: boolean,
    isSuccess: boolean,
    setShowLoginModal:React.Dispatch<React.SetStateAction<boolean>>,
    isAuthenticateUser:boolean
}
function MainContainer({ isLoading,setShowLoginModal, itemsList, isSuccess,isAuthenticateUser }: propType) {

    if (isLoading) {
        return (
            <div className="wrapper pt-[3rem] h-full">
                <Skelton />
            </div>
        )
    }
    return (
        <div className='pt-[3rem] bg-[#eaeaee]'>
            {isSuccess && <main className="items_home py-2 px-1 flex flex-wrap mobile:justify-center  gap-x-1 gap-y-2 bg-[#d3cfcf99] justify-center h-full">
                {itemsList !== undefined && itemsList.map((item: ItemType, index: number) => {
                    return <Items isAuthenticateUser={isAuthenticateUser} item={item} key={index} setShowLoginModal={setShowLoginModal}/>
                })}
            </main>}

        </div>
    )
}

export default MainContainer