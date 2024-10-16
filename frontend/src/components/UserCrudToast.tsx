import React, { FC, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    statusType: string
    message: string
}


const UserCrudToast: FC<ToastProps> = ({ statusType, message }) => {
    useEffect(() => {
        if (statusType === "success") {
            toast.success(message);
        }
        else if (statusType === "error") {
            toast.error(message)
        } else return
    }, [statusType])

    return (
        <ToastContainer draggable={false} autoClose={1200} position='top-center' />
    )
}

export default UserCrudToast