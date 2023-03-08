import axios, { AxiosError } from "axios"
import { useEffect, useMemo, useState } from "react";
function PageNotFound() {
    const [file, setFile] = useState<string | ArrayBuffer | null>(null)
    const [loader, setLoader] = useState<boolean>(false)
    const get404Image = useMemo(() => {
        (
            async function () {
                try {
                    setLoader(true)
                    const res = await axios.get("/api/v1/static/404", {
                        responseType: "blob"
                    })
                    const reader = new FileReader()
                    reader.onload = () => {
                        setFile(reader.result)
                    }
                    reader.readAsDataURL(res.data)
                } catch (err: unknown) {
                    setLoader(false)
                    const error = err as AxiosError
                    console.warn(error)
                }
                finally {
                    setLoader(false)
                }
            }
        )()
    }, [])
    useEffect(() => {
        get404Image
    }, [])
    return (
        <div className='w-full h-full relative bg-[#fff]'>
            <div className={`image w-[100%] h-full mobile:h-[60%] `}>
                {
                    loader ?
                        <p className="w-full h-full bg-[#e9e4e4] animate-pulse"></p> :
                        (typeof file === "string" &&
                            <img src={file} className="w-full h-full" alt="" />
                        )
                }
            </div>
            <p
                onClick={() => {
                    window.location.href = "/"
                }}
                className='text-[1.4rem] absolute bottom-[1.6rem] right-[50%] mobile:right-[38%] mobile:top-[60%] font-serif underline text-[#0945e9] cursor-pointer'>Go to Home</p>
        </div>
    )
}
export default PageNotFound