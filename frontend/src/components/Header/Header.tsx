import React, {useContext,useState} from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import {UserContext} from "../../Provider/context";
import UserCrudToast from "../UserCrudToast";
import {useNavigate} from "react-router-dom";
export default function Header() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [success, setSuccess] = useState<string | null>(null)
    const context = useContext(UserContext)
    if (!context) {
        // Eğer context null ise, hata döndür ya da uygun bir fallback döndür.
        return <div>Error: ModalContext is not available</div>;
    }
    const { state, openAddUserModal,
        setOpenAddUserModal,
        openUpdateUserModal,logoutUser,
        setOpenUpdateUserModal,user } = context


    const menuItems = [
        "Log Out",
    ];
    const logout = async () => {
        setSuccess(null)
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include", // Çerezleri dahil etmek için kullanılır
            });

            if (response.ok) {
                setSuccess("Logged out successfully");
                localStorage.removeItem("loginUser");
                localStorage.removeItem("token");
                await logoutUser();
                // Kullanıcıyı giriş sayfasına yönlendirme
                setTimeout(()=>{
                   navigate("/")
                },2000)
            } else {
                const result = await response.json(); // `await` ekledik
                console.log(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className={"bg-black text-white"}>
            {success && <UserCrudToast statusType={"success"} message={success} />}

            <NavbarContent>
                <NavbarBrand>
                    <Button  onPress={()=>navigate("/")} disableAnimation={true} className={"text-white bg-transparent text-2xl"}>
                        React & Express
                    </Button>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
                {user.name !== null ?
                   <div className={"flex  w-full justify-between items-center"}>
                       <p>Hoşgeldin ; <span className={"underline"}>{user.name}</span></p>
                       <Button onPress={logout} color="danger" disableAnimation={true}   variant="flat" className={"text-white"}>
                           Logout!
                       </Button>
                   </div>
                    :
                    <>
                        <NavbarItem>
                            <Button  onPress={()=>navigate("/login")} color="secondary" disableAnimation={true} variant="flat" className={"text-white"}>
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={()=>navigate("/register")} color="primary" disableAnimation={true}  variant="flat" className={"text-white"}>
                                Register
                            </Button>
                        </NavbarItem>
                    </>
                }
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
