import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { allAddressType, login_Reducer_initial_type, nameAndLnameUpdatetype, registerUserInfoType, setActiveAddressType, userAddressesType } from "../../types/types"
export const UserDetaisAPI = createApi({
    reducerPath: "information",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL,credentials:"include" }),
    endpoints: (build) => ({
        userRegister: build.mutation<{ message: string, userId?: string }, registerUserInfoType>({
            query(info) {
                return {
                    url: "/api/v1/user/register",
                    method: "POST",
                    body: info,
                    responseHandler(response) {
                        return  response.json()
                    },
                }
            }
        }),
        userLogin: build.mutation<string, login_Reducer_initial_type>({
            query(info) {
                return {
                    url: "/api/v1/user/login",
                    method: "POST",
                    body: info,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        userOnLogout:build.mutation({
            query(){
                return {
                    url:"/api/v1/user/logout",
                    method:"POST",
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        updateNameAndLastName: build.mutation<string, nameAndLnameUpdatetype | Pick<nameAndLnameUpdatetype, "userId" | "status"> & { gender: string }>({
            query(info) {
                return {
                    url: "/api/v1/user/update",
                    method: "PUT",
                    body: info,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        getOTPBYEmail: build.mutation<string, Pick<nameAndLnameUpdatetype, "userId"> & { email: string }>({
            query(bodyData) {
                return {
                    url: "/api/v1/otp",
                    method: "POST",
                    body: bodyData,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        EmailOTPVerify: build.mutation<string, Pick<nameAndLnameUpdatetype, "userId"> & { email: string, otp: string }>({
            query(item) {
                return {
                    url: "/api/v1/otp/verify",
                    method: "POST",
                    body: item,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        addNewAddress: build.mutation<string, userAddressesType & { userId: string }>({
            query(item) {
                return {
                    url: "/api/v1/address/add",
                    method: "POST",
                    body: item,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        getAllAddress: build.mutation<allAddressType[], Pick<nameAndLnameUpdatetype, "userId">>({
            query(item) {
                return {
                    url: "/api/v1/address/all",
                    method: "POST",
                    body: item,
                    responseHandler(response) {
                        return response.json()
                    },
                }
            }
        }),
        setActiveAddress: build.mutation<string, { userId: string, addressId: string }>({
            query(item) {
                return {
                    url: "/api/v1/address/active",
                    method: "PUT",
                    body: item,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        deleteAddress: build.mutation<string, Pick<setActiveAddressType, "userId" | "addressId">>({
            query(item) {
                return {
                    url: "/api/v1/address/delete",
                    method: "DELETE",
                    body: item,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        onGivePayment: build.mutation<string, Pick<setActiveAddressType, "userId">>({
            query(id) {
                return {
                    url: "/api/v1/stripe/create-checkout-session",
                    method: "POST",
                    body: id,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        getUserName: build.mutation<string, { userId: string }>({
            query(id) {
                return {
                    url: "/api/v1/user/info",
                    method: "POST",
                    body: id,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        })
    }),
})
export const { useUpdateNameAndLastNameMutation, useGetOTPBYEmailMutation, useEmailOTPVerifyMutation, useAddNewAddressMutation, useGetAllAddressMutation, useSetActiveAddressMutation, useDeleteAddressMutation, useOnGivePaymentMutation, useGetUserNameMutation, useUserRegisterMutation,useUserLoginMutation,useUserOnLogoutMutation } = UserDetaisAPI