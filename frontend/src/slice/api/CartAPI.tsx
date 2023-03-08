import { deleteItemType, getCartItemFromDBType, itemAddType, orderItemType } from "../../types/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const newApiSlice = createApi({
    reducerPath: "cart",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL,credentials:"include" }),
    endpoints: (build) => ({
        addProduct: build.mutation<string, itemAddType>({
            query(item) {
                return {
                    url: "/api/v1/item/add",
                    method: "POST",
                    body: item,
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        deleteItem: build.mutation<string, deleteItemType>({
            query(item) {
                return {
                    url: `/api/v1/item/delete/${item.params}`,
                    method: "DELETE",
                    body: { userId: item.userId, status: item.status },
                    responseHandler(response) {
                        return response.text()
                    },
                }
            }
        }),
        getOrders: build.mutation<string | orderItemType[], Pick<itemAddType, "userId">>({
            query(id) {
                return {
                    url: "/api/v1/orders",
                    body: id,
                    method: "POST"
                }
            }
        })
    })
})
export const { useAddProductMutation, useDeleteItemMutation, useGetOrdersMutation } = newApiSlice