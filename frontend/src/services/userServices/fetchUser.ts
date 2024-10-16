import { UserData } from "../../interfaces/Users";

// Kullanıcıları fetch eden ve veriyi ters sıralayan fonksiyon
export const fetchUsers = async (): Promise<UserData[]> => {
    const response = await fetch("http://localhost:5000/api/users");
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);  // Hata durumunda hata fırlatıyoruz
    }
    const data: UserData[] = await response.json();
    return data;
};
