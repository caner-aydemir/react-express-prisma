import { useContext } from 'react';
import './App.css';
import AddUserModal from './components/AddUserModal';
import UsersTable from './components/AllUsers/Users';
import { Button } from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Provider/context';
import UpdateUserModal from './components/UpdateUserModal';



function App() {


  const modalContext = useContext(UserContext)
  if (!modalContext) {
    // Eğer context null ise, hata döndür ya da uygun bir fallback döndür.
    return <div>Error: ModalContext is not available</div>;
  }
  const { openAddUserModal,
    setOpenAddUserModal,
    openUpdateUserModal,
    setOpenUpdateUserModal } = modalContext
  return (
    <div className="w-full h-auto  p-5 xs:p-0 text-white flex flex-col gap-y-10  ">
      <Button onPress={() => setOpenAddUserModal(!openAddUserModal)} className='text-xl w-1/6 xs:w-2/3 mx-auto text-white' color='warning'>Create New User</Button>
      <UsersTable />
      {openAddUserModal &&
        <AddUserModal
          show={openAddUserModal}
          close={() => setOpenAddUserModal(!openAddUserModal)}
        />}
      {openUpdateUserModal &&
        <UpdateUserModal
          show={openUpdateUserModal}
          close={() => setOpenUpdateUserModal(!openUpdateUserModal)}
        />
      }


    </div>
  );
}

export default App;
