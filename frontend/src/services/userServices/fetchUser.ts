import { UserData } from "../../interfaces/Users";

// Kullanıcıları fetch eden ve veriyi ters sıralayan fonksiyon
export const fetchUsers = async (): Promise<UserData[]> => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    const response = await fetch(`${backendUrl}/api/users`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);  // Hata durumunda hata fırlatıyoruz
    }
    const data: UserData[] = await response.json();
    return data;
};
