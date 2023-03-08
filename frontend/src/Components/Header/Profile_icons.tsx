import React from 'react'
type propType = {
    setShowRightSideBar: React.Dispatch<React.SetStateAction<boolean>>,
    showRightSideBar: boolean,
    isHaveImage: string | null
}
function Profile_icons({ setShowRightSideBar, showRightSideBar, isHaveImage }: propType) {
    return (
        <div className="user_info flex justify-center items-center mobile:pr-2 pl-2">
            <div className="avatar cursor-pointer">
                <div className="w-[2rem] rounded-full ring-[2px] ring-primary ring-offset-200   ring-offset-2"
                    onClick={() => {
                        setShowRightSideBar(!showRightSideBar)
                    }}
                >
                    {isHaveImage !== null && (isHaveImage.endsWith(".png") ? (
                        <img crossOrigin="anonymous" src={process.env.BACKEND_URL + "/api/v1/static/profile"} />
                    ) : (
                        <img crossOrigin="anonymous" src={isHaveImage} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile_icons;