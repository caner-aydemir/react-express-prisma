// context/UserContext.tsx
import React, { createContext, useReducer, ReactNode, useEffect, useState } from "react";
import { userReducer, initialState } from "../reducers/userReducer";
import {loginUserReducer,UserInitialState} from "../reducers/loginUserReducer"
import { UserState, UserData } from "../interfaces/Users";
import { fetchUsers as fetchUsersFromApi } from "../services/userServices/fetchUser";
import {LoginUser} from "../interfaces/LoginUser";  // API fonksiyonunu import ediyoruz
interface UserContextProps {
    state: UserState;
    user : LoginUser;
    fetchUsers: () => void;
    logoutUser:()=>void
    addNewUserState: (newUser: UserData) => void;
    updateNewUserState: (updatedUser: UserData) => void
    deleteUserState: (updatedUser: UserData) => void
    setLoginUser : (loginUser : LoginUser) =>void
    openAddUserModal: boolean
    setOpenAddUserModal: React.Dispatch<React.SetStateAction<boolean>>
    openUpdateUserModal: boolean
    setOpenUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>
    selectUserData: never[]
    setSelectUserData: React.Dispatch<React.SetStateAction<never[]>>
    usersArray: UserData[]
    setUsersArray: React.Dispatch<React.SetStateAction<UserData[]>>
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [user, dispatchLoginUserReducer] = useReducer(loginUserReducer, UserInitialState);
    const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false)
    const [openUpdateUserModal, setOpenUpdateUserModal] = useState<boolean>(false)
    const [selectUserData, setSelectUserData] = useState([])
    const [usersArray, setUsersArray] = useState<UserData[]>([])
    const [searchValue, setSearchValue] = useState("")
    async function addRandomFakeUser() {
        const userData = [
            {
                "name": "John Doe",
                "age": 28,
                "email": "johndoe@example.com"
            },
            {
                "name": "Jane Smith",
                "age": 34,
                "email": "janesmith@example.com"
            },
            {
                "name": "Alice Johnson",
                "age": 22,
                "email": "alicejohnson@example.com"
            },
            {
                "name": "Bob Brown",
                "age": 40,
                "email": "bobbrown@example.com"
            },
            {
                "name": "Charlie Davis",
                "age": 30,
                "email": "charliedavis@example.com"
            },
            {
                "name": "Emma Wilson",
                "age": 25,
                "email": "emmawilson@example.com"
            },
            {
                "name": "Liam Miller",
                "age": 29,
                "email": "liammiller@example.com"
            },
            {
                "name": "Sophia Lee",
                "age": 27,
                "email": "sophialee@example.com"
            },
            {
                "name": "James White",
                "age": 35,
                "email": "jameswhite@example.com"
            },
            {
                "name": "Mia Martinez",
                "age": 24,
                "email": "miamartinez@example.com"
            },
            {
                "name": "Noah Clark",
                "age": 32,
                "email": "noahclark@example.com"
            },
            {
                "name": "Olivia Lewis",
                "age": 26,
                "email": "olivialewis@example.com"
            },
            {
                "name": "William Walker",
                "age": 38,
                "email": "williamwalker@example.com"
            },
            {
                "name": "Ava Robinson",
                "age": 31,
                "email": "avarobinson@example.com"
            },
            {
                "name": "Ethan Harris",
                "age": 36,
                "email": "ethanharris@example.com"
            },
            {
                "name": "Isabella Young",
                "age": 21,
                "email": "isabellayoung@example.com"
            },
            {
                "name": "Mason King",
                "age": 33,
                "email": "masonking@example.com"
            },
            {
                "name": "Amelia Scott",
                "age": 29,
                "email": "ameliascott@example.com"
            },
            {
                "name": "Lucas Green",
                "age": 28,
                "email": "lucasgreen@example.com"
            },
            {
                "name": "Harper Adams",
                "age": 23,
                "email": "harperadams@example.com"
            }
        ]
        try {
            for (const user in userData) {
                const request = await fetch("http://localhost:5000/api/addUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData[user])
                })

                const response = await request.json()

            }
        }
        catch (error) {
            console.log("error", error)
        }
    }

    const fetchUsers = async () => {
        dispatch({ type: "FETCH_LOADING" });
        try {
            const data: UserData[] = await fetchUsersFromApi();  // API'den veriyi çekiyoruz
            dispatch({ type: "FETCH_SUCCESS", payload: data });  // Veriyi reducer'a başarıyla gönderiyoruz
        } catch (error: any) {
            dispatch({ type: "FETCH_ERROR", payload: error.message });  // Hata durumunu reducer'a gönderiyoruz
        }
    };

    const setLoginUser = (loginUser : LoginUser) =>{
        dispatchLoginUserReducer({type: "LOGIN_USER_DATA" , payload:loginUser})
    }
    const logoutUser = ()=>{
        dispatchLoginUserReducer({type: "LOGIN_USER_DATA" , payload:UserInitialState})

    }


    const addNewUserState = (newUser: UserData) => {
        dispatch({ type: "ADD_USER", payload: newUser })
    }

    const updateNewUserState = (updatedUser: UserData) => {
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
    }

    const deleteUserState = async (deletedUser: UserData) => {
        const response = await fetch("http://localhost:5000/api/deleteUser",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(deletedUser)
            },

        )
        const result = await response.json()

        if (result.status === true) {
            dispatch({ type: "DELETE_USER", payload: deletedUser })
        }

    }

    useEffect(() => {
        const loginUser = localStorage.getItem("loginUser")
        if (loginUser){
            const parseData = JSON.parse(loginUser)
            setLoginUser(parseData)
        }
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{
            state,
            fetchUsers,
            addNewUserState,
            updateNewUserState, deleteUserState,
            openAddUserModal, setOpenAddUserModal,
            openUpdateUserModal, setOpenUpdateUserModal, selectUserData,
            setSelectUserData, usersArray,
            setUsersArray, searchValue,
            setSearchValue,setLoginUser, user,logoutUser
        }}>
            {children}
        </UserContext.Provider>
    );
};