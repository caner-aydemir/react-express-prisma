import React, { useContext, useMemo, useState } from 'react'
import { Modal, Input, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { UserContext } from '../Provider/context';
import { validateAge, validateName } from '../helpers/validationHelpers';
import { MailIcon } from "../icons/MailIcon";
import UserCrudToast from './UserCrudToast';
import { updateUser } from '../services/userServices/updateUser';


interface UpdateUserModal {
    show: boolean,
    close: () => void
}

const UpdateUserModal = ({ show, close }: UpdateUserModal) => {
    const { updateNewUserState, selectUserData,
        setSelectUserData } = useContext<any>(UserContext)

    const [newName, setNewName] = useState(selectUserData.name)
    const [newAge, setNewAge] = useState(selectUserData.age)
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState<string | null>(null)

    const isInvalidName = useMemo(() => (newName === selectUserData.name ? false : !validateName(newName)), [newName]);
    const isInvalidAge = useMemo(() => (newAge === selectUserData.age ? false : !validateAge(Number(newAge))), [newAge]);

    const isEmpty = newName === "" || newAge === ""
    const isNotChanged = newAge === selectUserData.age && newName === selectUserData.name



    const updateUserFunc = async () => {
        setSuccess(null)
        setError(null)
        setIsLoading(true);
        const newUser = { name: newName, email: selectUserData.email, age: Number(newAge), id: selectUserData.id };
        try {
            const request = await updateUser(newUser)

            if (request.status === true) {
                setSuccess(request.message)
                updateNewUserState(newUser)
                setSelectUserData([])
                setTimeout(close, 2000);

            }
            else {
                setError(request.message)
            }
        }
        catch (error: any) {
            setError(error.message);
        }
        finally {
            setIsLoading(false)
        }

    };

    return (
        <Modal isOpen={show} onClose={close} placement="top" className="bg-gray-900 text-white xs:w-3/4" backdrop="blur" isDismissable={false}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex text-center text-xl flex-col gap-1">Update User</ModalHeader>
                        <ModalBody>
                            <Input
                                name="email"
                                label="Email"
                                isReadOnly
                                variant="underlined"
                                placeholder={selectUserData.email}
                                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            />
                            <span className='text-xs text-center text-orange-400 font-semibold'>( Mail değiştirilemez )</span>

                            <Input
                                name="name"
                                label="Name"
                                variant="underlined"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                isInvalid={isInvalidName}
                                errorMessage="Please enter letter only"
                                color={isInvalidName ? "danger" : "success"}
                            />
                            <Input
                                name="age"
                                label="Age"

                                variant="underlined"
                                onChange={(e) => setNewAge(e.target.value)}
                                value={newAge}

                                isInvalid={isInvalidAge}
                                errorMessage="Please enter a valid age"
                                color={isInvalidAge ? "danger" : "success"}
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
                                onPress={updateUserFunc}
                                isDisabled={isEmpty || isInvalidAge || isInvalidName || isNotChanged}
                            >
                                {isLoading ? "Updating..." : "Update User"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default UpdateUserModal