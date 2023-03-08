import React from 'react'
import { useNavigate } from 'react-router-dom'
type propType = {
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}
function Header({ setShowLoginModal }: propType) {
    const navigate= useNavigate()
    return (
        <header className=' flex justify-end'>
            <p className='text-[#fff] rounded-tr-md rounded-bl-md bg-[#da0808] px-2 text-[1.1rem] font-sans cursor-pointer'
                onClick={() => {
                    navigate("/")
                    setShowLoginModal(false)
                }}
            >
                X
            </p>
        </header>
    )
}
export default React.memo(Header)