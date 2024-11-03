import React, {useContext, useMemo, useState} from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {MailIcon} from "../../icons/MailIcon";
import UserCrudToast from "../../components/UserCrudToast";
import {UserContext} from "../../Provider/context";
import {validateAge, validateEmail, validateName, validatePassword} from "../../helpers/validationHelpers";
import {EyeSlashFilledIcon} from "../../icons/EyeSlashFilledIcon";
import {EyeFilledIcon} from "../../icons/EyeFilledIcon";
import {RegisterUser} from "../../services/userServices/register";
import {LoginUser} from "../../interfaces/LoginUser";

const Register = () => {

    const {users, setUsers, addNewUserState,setLoginUser} = useContext<any>(UserContext);
    const [formData, setFormData] = useState({name: "", age: "", email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null)
    const {name, age, email, password} = formData;
    const isNotEmpty = name && email && Number(age) && password;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }
    const isInvalidName = useMemo(() => (name === "" ? false : !validateName(name)), [name]);
    const isInvalidEmail = useMemo(() => (email === "" ? false : !validateEmail(email)), [email]);
    const isInvalidAge = useMemo(() => (age === "" ? false : !validateAge(Number(age))), [age]);
    const isInvalidPassword = useMemo(() => (password === "" ? false : !validatePassword(password)), [password])

    const registerFunc = async () => {
        setSuccess(null)
        setError(null)
        if (isNotEmpty && !isInvalidAge && !isInvalidEmail && !isInvalidName) {
            setIsLoading(true);
            const newUser = {name, email, age: Number(age), password};
            const request = await RegisterUser(newUser)
            if(request?.status === true){
                const loginUser:LoginUser = request.user
                setLoginUser(loginUser)
                localStorage.setItem("token" , request.token)
                localStorage.setItem("loginUser" , JSON.stringify({
                    name:request.user.name,
                    email : request.user.email,
                    id:request.user.id,
                    age : request.user.age,
                    createdAt:request.user.createdAt
                }))
                setSuccess("Aramıza hoşgeldin")
                setError(null)
                setTimeout(()=>{
                    window.location.href ="/"
                },3000)
            }
            else
            {
                setError(request.message);
            }
            setIsLoading(false)
        }
    };
    const errorMessage = useMemo(() => isInvalidPassword ? isInvalidPassword : "", [password]);

    const resetForm = () => {
        setFormData({name: "", age: "", email: "", password: ""});
    };
    return (
        <div className={"flex justify-center items-center w-full my-20"}>
            <div className={"w-1/3 flex flex-col p-5 bg-gray-950 text-white rounded-xl shadow-2xl"}>
                <div className="flex text-center text-xl flex-col gap-1">Register</div>
                <div>
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
                        endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
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
                    <Input
                        name="password"
                        label="Password"
                        placeholder="Enter user password"
                        variant="underlined"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                                    aria-label="toggle password visibility">
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                )}
                            </button>
                        }
                        isInvalid={isInvalidPassword}
                        errorMessage={errorMessage}
                        type={isVisible ? "text" : "password"}
                        autoComplete="off"
                        color={isInvalidPassword ? "danger" : "success"}
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-y-3">
                    {error && <>
                        <div className="text-center font-bold text-red-500">{error}</div>
                        <UserCrudToast statusType={"error"} message={error}/>
                    </>}
                    {success && <UserCrudToast statusType={"success"} message={success}/>}
                    <div className={"flex justify-center items-center py-3"}>
                        <Button
                            isLoading={isLoading}
                            color="success"
                            variant="bordered"
                            onPress={registerFunc}
                            isDisabled={!isNotEmpty || isInvalidAge || isInvalidEmail || isInvalidName || isInvalidPassword}
                        >
                            {isLoading ? "Please wait..." : "Register"}
                        </Button>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Register;
