import { UserData } from "../../interfaces/Users";

export const deleteUser = async (userData: UserData) => {
    try {
        const response = await fetch("http://localhost:5000/api/deleteUser", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
    }
    catch (error: any) {

    }


}