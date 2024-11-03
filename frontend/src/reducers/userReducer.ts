import { UserData, UserState } from "../interfaces/Users";

export type UserAction =
    | { type: "FETCH_SUCCESS"; payload: UserData[] }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "FETCH_LOADING" }
    | { type: "ADD_USER"; payload: UserData }
    | { type: "UPDATE_USER"; payload: UserData }
    | { type: "DELETE_USER"; payload: UserData }
    | { type: "FILTERED_USER"; payload: UserData[] }
    | { type: "RESET_FILTER" };  // Filtreyi sıfırlama aksiyonu








export const initialState: UserState = {
    users: [],
    loading: true,
    filtered_users: [],  // Filtrelenmiş kullanıcılar
    error: null
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { users: action.payload, loading: false, error: null };

        case "FETCH_LOADING":
            return { ...state, loading: true, error: null }; // Yükleme durumu

        case "FETCH_ERROR":
            return { ...state, error: action.payload, loading: false }; // Hata durumu
        case "ADD_USER":
            return { ...state, users: [action.payload, ...state.users] };
        case "UPDATE_USER": // Kullanıcı güncelleme
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user =>
                    user.email !== action.payload.email
                ),
            };

        default:
            return state
    }
}

