import {LoginUser} from "../interfaces/LoginUser";

export type UserAction =
    | { type: "LOGIN_USER_DATA"; payload: LoginUser}



export const UserInitialState: LoginUser = {
    id :null,
    name : null,
    email : null,
    age:null,
    createdAt:null
}

export const loginUserReducer = (user: LoginUser, action: UserAction):LoginUser => {
    switch (action.type) {
        case "LOGIN_USER_DATA":
            return action.payload; // Doğrudan `action.payload` döndürülüyor
        default:
            return user
    }
}

