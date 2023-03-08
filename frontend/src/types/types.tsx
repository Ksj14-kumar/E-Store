import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
export interface ItemType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: { rate: number, count: number },
    count: number
}
export interface SerializedError {
    name?: string
    message?: string
    stack?: string
    code?: string
}
export interface CartItemStatusType {
    id: number,
    name: string,
    status: string
}
export type addressType = {
    id: number,
    placeHolder: string,
}
export type profileType = {
    id: number,
    name: string
}
export type nameInfoType = {
    name: string,
    lname: string
}
export interface userAddressesType {
    name: string,
    address: string,
    locality: string,
    pincode: string,
    city: string,
    state: string,
    mobile: string
}
// ==================================RTK Query Types================================
export type getCartItemFromDBType = {
    items: ItemType[],
    totalItems: number,
    totalAmount: number
}
export type itemAddType = {
    item: ItemType,
    userId: string
}
export type deleteItemType = {
    userId: string,
    status: number,
    params: number
}
// =//======================================RTK QUERY UserInformation Change types=======================
export interface nameAndLnameUpdatetype {
    name: string,
    lname: string,
    status: number,
    userId: string
}
export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}
export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}
export interface setActiveAddressType {
    active: boolean,
    userId: string,
    addressId: string
}
export interface allAddressType {
    _id: string,
    name: string,
    locality: string,
    pincode: string,
    address: string,
    city: string,
    state: string,
    mobile: string,
    userId: string,
    active: boolean,
    __v: number
}
export interface rigthSidebarList {
    name: string,
    id: number,
    icon: JSX.Element,
    path: string
}
// =================================================Socket Connection=====================================
export interface socketAddressType {
    msg: string | allAddressType[],
    status: number
}
// /================================Order Items types==================================================
export interface deliveryItemsTypes {
    category: string,
    count: number,
    description: string,
    id: string,
    image: string,
    price: number,
    rating: {
        rate: number,
        count: number
    },
    title: string,
}
export interface orderItemType {
    address: {
        city: string,
        line1: string,
        line2: string,
        postal_code: string,
        state: string,
    },
    amount: number,
    deliveryStatus: string,
    items: deliveryItemsTypes[],
    name: string,
    paymentStatus: string,
    phone: string,
    time: number
}
// =====================================Register Types===========================================
export type registerUserInfoType = {
    email: string,
    password: string
} & nameInfoType
export type registerUserResponseType = {
    userId: string,
    message: string
}
export interface initial_register_reducer_type {
    register: {
        id: number,
        registerDetails: { name: string, lname: string, email: string, password: string }
    },
    otpBox: {
        id: number,
        setOTPBox: boolean
    },
    inputOTP: {
        id: number,
        setInputOTP: string
    },
    verifyLoader: {
        id: number,
        setIsVerifyLoader: boolean
    },
    resendMessage: {
        id: number,
        setResendButtonMessage: string
    }
}
export type login_reducer_actionType = {
    type: "email" | "password",
    payload: string
}
export type login_Reducer_initial_type = {
    email: string,
    password: string
}