import React from 'react'
import { UserData } from '../../interfaces/Users'

export const updateUser = async (userData: UserData) => {


    const request = await fetch("http://localhost:5000/api/updateUser", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })

    const response = await request.json()
    if (response.status === true) {
        return { status: true, message: "Kullanıcı başarıyla güncellendi" }

    }
    else {
        return { status: false, message: "Sunucu tarafında bir hata oluştu. Lütfen tekrar deneyiniz" }

    }






}
