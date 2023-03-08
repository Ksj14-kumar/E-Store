import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { rigthSidebarList } from '../../types/types'
import React, { useEffect } from 'react'
import { useUserOnLogoutMutation } from '../../slice/api/UserinfoAPI'
type propType = {
    item: rigthSidebarList,
    id: number
}
function NavigationList({ item, id }: propType) {
    const navigate = useNavigate()
    const [onLogout, { isLoading, isSuccess }] = useUserOnLogoutMutation()
    async function onLogoutHandler() {
        try {
            const res = await onLogout("").unwrap()
            localStorage.clear()
            window.location.href = "/"
        } catch (err) {
            console.warn(err)
        }
    }
    return (
        <motion.li
            initial={{ scale: 1 }}
            transition={{ duration: .5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
                if (item.id !== 3) {
                    navigate(item.path)
                }
                else {
                    onLogoutHandler()
                }
            }}
            key={id}
            className={`text-[1.4rem] flex bg-[#e6e1e1] cursor-pointer hover:bg-[#f2efef] rounded-md items-center px-4 py-2 drop-shadow-lg mb-2`}
            role="button"
        >
            <p className="text-[1.4rem] cursor-pointer truncate">
                {item.icon}
            </p>
            <p className='text-[1.2rem] cursor-pointer pl-3 truncate tracking-wider'>{item.name}</p>
        </motion.li>
    )
}
export default React.memo(NavigationList)