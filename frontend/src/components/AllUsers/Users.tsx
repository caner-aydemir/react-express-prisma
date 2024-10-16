import { useContext } from "react";
import { UserContext } from "../../Provider/context";
import { Spinner } from "@nextui-org/react";
import UserTable from "./UserTable";  // Change the import to UserTable
import { UserData } from "../../interfaces/Users";
import UserCrudToast from "../UserCrudToast";

const Users = () => {
    const context = useContext(UserContext);

    if (!context) {
        return <p>Context is not available</p>;
    }

    const { state } = context;
    const { users, loading, error } = state;

    if (loading) return <Spinner label="Loading..." color="warning" />;
    if (error) {
        const errorMessageFromBackend = "Something went wrong. Please try again later."
        return (
            <>
                <strong className="text-center text-red-500">{errorMessageFromBackend}</strong>
                <UserCrudToast statusType={"error"} message={errorMessageFromBackend} />
            </>
        )
    }
    return (
        <>
            {
                users.length > 0 ?
                    <UserTable users={users as UserData[]} />  // Use the correct component UserTable
                    :
                    <p className="text-center text-2xl">Elimizde sana user kalmadı :) <br /> <span className="text-xl">Yukarıda ki butondan hemen oluşturabilirsin.</span></p>
            }
        </>

    );
};

export default Users;
