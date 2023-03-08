import React from 'react'
import { ColorRing, Oval } from 'react-loader-spinner'
type propType = {
    width: number,
    height: number
}
function Loader({ width, height }: propType): JSX.Element {
    return (
        <ColorRing
            visible={true}
            height={height}
            width={width}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
    )
}
export default Loader
type props = {
    w: number,
    h: number
}
export function OvalLoader({ h, w }: props): JSX.Element {
    return <Oval
        height={h}
        width={w}
        color="#E90064"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#FFED00"
        strokeWidth={2}
        strokeWidthSecondary={2}
    />
}