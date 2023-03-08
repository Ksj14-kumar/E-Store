import { toast } from 'react-hot-toast';
import Loader, { OvalLoader } from '../../loader/Loader';
import { useOnGivePaymentMutation } from '../../slice/api/UserinfoAPI';
import { isAuthenticate, useAppSelector } from '../../store';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../types/types';
function Payment() {
    const isAuth = useAppSelector(isAuthenticate)
    const [onGivePay, { isLoading }] = useOnGivePaymentMutation()
    async function onPayPrice() {
        try {
            if (isAuth.isHaveId) {
                const res = await onGivePay({ userId: isAuth.isHaveId }).unwrap()
                window.location.href = res
            }
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                if (err.data) {
                    toast.error(JSON.stringify(err.data), { duration: 2000, position: "bottom-center" })
                    return
                }
            }
            else if (isErrorWithMessage(err)) {
                toast.error(err.message, { position: "bottom-center", duration: 2000 })
                return
            }
        }
    }
    return (
        <>
            <div className='bg-[#e5e0e0] rounded-m rounded-t-none px-1 py-2'>
                <button className='btn btn-block btn-success'
                    disabled={isLoading}
                    onClick={() => {
                        onPayPrice()
                    }}
                >{isLoading ? <OvalLoader w={35} h={35} /> : "Pay"}</button>
            </div>
        </>
    )
}
export default Payment
