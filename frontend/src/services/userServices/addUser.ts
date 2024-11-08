import { UserData } from "../../interfaces/Users";

export const addUser = async (userData: UserData) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    try {
        const response = await fetch(`${backendUrl}/api/addUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            // Hata mesajını JSON formatında yakalayalım
            const errorData = await response.json();
            const errorMessage = errorData.error || 'Failed to add user';  // Gelen JSON'da error mesajı varsa kullan, yoksa varsayılanı kullan.
            throw new Error(errorMessage);  // Error objesi içinde anlamlı bir mesaj at
        }

        // Başarılı ise dönen veriyi parse edelim
        const result = await response.json();
        return {
            status: true,
            data: result,
        };

    } catch (error: any) {
        // Hata durumunda error.message'i frontend'e döndürelim
        return {
            status: false,
            error: error.message || "An unexpected error occurred",  // Hata mesajını burada anlamlı hale getir
        };
    }
};