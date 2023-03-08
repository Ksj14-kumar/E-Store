import React from 'react'
function Side_Login() {
    function onLoginByGoogle() {
        const win = window.open("/api/v1/google/login", "_self",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=400,width=400,height=500")
    }
    function onLoginByFacebook() {
        const win = window.open("/api/v1/fb/login", "_self",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=400,width=400,height=500")
    }
    return (
        <div className="wrapper_side_login mb-2">
            <div className="google_login w-full flex px-[2rem] mb-1">
                <button className='btn bg-[#ce0e15] btn-block btn-sm'
                    onClick={onLoginByGoogle}
                >google</button>
            </div>
            {/* <div className="google_login w-full flex px-[2rem]">
                <button
                onClick={onLoginByFacebook}
                className='btn bg-[#1d038f] btn-block btn-sm'>facebook</button>
            </div> */}
        </div>
    )
}
export default React.memo(Side_Login)