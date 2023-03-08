import { login_reducer_actionType, login_Reducer_initial_type } from "../types/types"
export const initialState: login_Reducer_initial_type = {
    email: "",
    password: ""
}
export function reducerHandler(state: login_Reducer_initial_type, action: login_reducer_actionType) {
    switch (action.type) {
        case "email":
            const newState = { ...state, email: action.payload }
            return newState
        case "password":
            return {
                ...state,
                password: action.payload
            }
    }
}