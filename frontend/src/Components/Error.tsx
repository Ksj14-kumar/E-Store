import React from 'react'
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { SerializedError } from '../types/types'
type propType = {
    error: FetchBaseQueryError | SerializedError | undefined
}
function Error({ error }: propType): JSX.Element {
    if (error) {
        if ('status' in error) {
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
            return (
                <div className='bg-[#ded8d8] pt-[3rem] min-h-screen flex justify-center items-center'>
                    <p className='text-center text-[1.2rem] select-none text-[#121212]'>
                        {errMsg}
                    </p>
                </div>
            )
        }
        else {
            return (
                <div className='bg-[#a39f9f] pt-[3rem] min-h-screen'>
                    <p>
                        {error?.message}
                    </p>
                </div>
            )
        }
    }
    return <></>
}
export default Error