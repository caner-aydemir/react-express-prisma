import { UserData } from "../../interfaces/Users";

export const deleteUser = async (userData: UserData) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    try {
        const response = await fetch(`${backendUrl}/api/deleteUser`, {
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