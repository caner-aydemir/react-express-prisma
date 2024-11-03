import React, {useContext, useMemo, useState} from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button} from "@nextui-org/react";
import {MailIcon} from "../../icons/MailIcon";
import {validateEmail, validatePassword} from "../../helpers/validationHelpers";
import {EyeSlashFilledIcon} from "../../icons/EyeSlashFilledIcon";
import {EyeFilledIcon} from "../../icons/EyeFilledIcon";
import {UserContext} from "../../Provider/context";
import UserCrudToast from "../../components/UserCrudToast";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null)
    const {setLoginUser} = useContext<any>(UserContext);

    const {email, password} = formData;
    const [isVisible, setIsVisible] = useState(false)
    const isInvalidEmail = useMemo(() => (email === "" ? false : !validateEmail(email)), [email]);
    const isInvalidPassword = useMemo(() => (password === "" ? false : !validatePassword(password)), [password])
    const errorMessage = useMemo(() => isInvalidPassword ? isInvalidPassword : "", [password]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }
    const navigate = useNavigate()

    const LoginUser = async () => {
        console.log(email);
        console.log(password);
        const data = {email, password}
        const request = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })


        if (!request.ok) {
            const errorResponse = await request.json()
            setError(errorResponse.message)
            setIsLoading(false)
            return
        }
        const response = await request.json()
        const {user, token, message} = response
        setLoginUser(user)
        localStorage.setItem("token", token)
        localStorage.setItem("loginUser", JSON.stringify({
            name: user.name,
            email: user.email,
            id: user.id,
            age: user.age,
            createdAt: user.createdAt
        }))
        setIsLoading(false)
        setSuccess(message)
        setError(null)
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }
    const isNotEmpty = email && password;

    return (
        <div className={"h-screen  flex items-center justify-center"}>
            <Card className="w-1/4 bg-gray-950 text-white shadow-2xl">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col w-full justify-center items-center text-center">
                        <p className="text-2xl ">Login</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Input
                        name="email"
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
                        name="password"
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
                </CardBody>
                <Divider/>
                <CardFooter>
                    <div className={"flex flex-col justify-center items-center w-full"}>
                        <Button isLoading={isLoading}
                                isDisabled={!isNotEmpty || isInvalidEmail || isInvalidPassword}
                                onPress={LoginUser} color={"success"} variant={"shadow"}>
                            {isLoading ? "Please wait..." : "Login"}

                        </Button>
                        {error && <>
                            <div className="text-center font-bold text-red-500">{error}</div>
                            <UserCrudToast statusType={"error"} message={error}/>
                        </>}
                        {success && <UserCrudToast statusType={"success"} message={success}/>}
                    </div>
                </CardFooter>
            </Card>

        </div>
    );
};

export default Login;
