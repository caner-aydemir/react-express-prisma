export const RegisterUser = async (userData: any) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    try {
        const request = await fetch(`${backendUrl}/api/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
        if (!request.ok) {
            const errorResponse = await request.json();
            return {status: false , message : errorResponse.error}
        }
        const response = await request.json()
        const user = response.user
        const token = response.token
        return {status: true, user, token}
    } catch (error: any) {
        return {status: false, message: error.message}
    }
}