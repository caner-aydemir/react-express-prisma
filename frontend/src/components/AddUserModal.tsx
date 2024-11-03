import React, { useContext, useState, useMemo } from "react";
import { Modal, Input, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tooltip } from "@nextui-org/react";
import { addUser } from "../services/userServices/addUser";
import { UserContext } from "../Provider/context";
import { MailIcon } from "../icons/MailIcon";
import { validateEmail, validateName, validateAge } from "../helpers/validationHelpers";
import UserCrudToast from "./UserCrudToast";

interface IAddUserModal {
    show: boolean;
    close: () => void;
}

const AddUserModal = ({ show, close }: IAddUserModal) => {
    const { users, setUsers, addNewUserState } = useContext<any>(UserContext);
    const [formData, setFormData] = useState({ name: "", age: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null)
    const { name, age, email } = formData;

    const isNotEmpty = name && email && Number(age);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isInvalidName = useMemo(() => (name === "" ? false : !validateName(name)), [name]);
    const isInvalidEmail = useMemo(() => (email === "" ? false : !validateEmail(email)), [email]);
    const isInvalidAge = useMemo(() => (age === "" ? false : !validateAge(Number(age))), [age]);

    const addUserFunc = async () => {
        setSuccess(null)
        setError(null)
        if (isNotEmpty && !isInvalidAge && !isInvalidEmail && !isInvalidName) {
            setIsLoading(true);
            const newUser = { name, email, age: Number(age) };

            try {
                const request = await addUser(newUser);
                if (request.status) {
                    addNewUserState(request.data)

                    setSuccess("User added successfully")
                    setError(null); // Başarı durumunda hata yok
                    resetForm();
                    setTimeout(close, 2000);
                } else {
                    setError(request.error || "Error adding user");
                }
            } catch (error) {
                setError("Something went wrong. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: "", age: "", email: "" });
    };

    return (
        <Modal isOpen={show} onClose={close} placement="top" className="bg-gray-900 text-white xs:w-3/4" backdrop="blur" isDismissable={false}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex text-center text-xl flex-col gap-1">Create New User</ModalHeader>
                        <ModalBody>
                            <Input
                                name="email"
                                label="Email"
                                placeholder="Enter user email"
                                labelPlacement="outside"
                                inputMode="email"
                                variant="underlined"
                                isInvalid={isInvalidEmail}
                                errorMessage="Please enter a valid email"
                                color={isInvalidEmail ? "danger" : "success"}
                                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                value={email}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="name"
                                label="Name"
                                placeholder="Enter user name"
                                variant="underlined"
                                isInvalid={isInvalidName}
                                errorMessage="Please enter letter only"
                                color={isInvalidName ? "danger" : "success"}
                                value={name}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="age"
                                label="Age"
                                placeholder="Enter user age"
                                variant="underlined"
                                isInvalid={isInvalidAge}
                                errorMessage="Please enter a valid age"
                                color={isInvalidAge ? "danger" : "success"}
                                value={age}
                                onChange={handleInputChange}
                                type="number"
                            />
                        </ModalBody>
                        <ModalFooter className="flex flex-col gap-y-3">
                            {error && <>
                                <div className="text-center font-bold text-red-500">{error}</div>
                                <UserCrudToast statusType={"error"} message={error} />
                            </>}
                            {success && <UserCrudToast statusType={"success"} message={success} />}
                            <Button
                                isLoading={isLoading}
                                color="success"
                                variant="bordered"
                                onPress={addUserFunc}
                                isDisabled={!isNotEmpty || isInvalidAge || isInvalidEmail || isInvalidName}
                            >
                                {isLoading ? "Adding..." : "Add User"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddUserModal;
