import {useContext, useEffect, useState} from 'react';
import './App.css';
import AddUserModal from './components/AddUserModal';
import Users from './components/AllUsers/Users';
import { Button } from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Provider/context';
import UpdateUserModal from './components/UpdateUserModal';
import FilterInputs from './components/FilterInputs';
function App() {
  const context = useContext(UserContext)
  if (!context) {
    // Eğer context null ise, hata döndür ya da uygun bir fallback döndür.
    return <div>Error: ModalContext is not available</div>;
  }
  const { state, openAddUserModal,
    setOpenAddUserModal,
    openUpdateUserModal,
    setOpenUpdateUserModal,user } = context
  return (
              <div className="w-full h-auto  p-5 xs:p-0 text-white flex flex-col gap-y-10  ">
                  <Button onPress={() => setOpenAddUserModal(!openAddUserModal)} className='text-xl w-1/6 xs:w-2/3 mx-auto text-white' color='warning'>Create New User</Button>
                  <FilterInputs />
                  <Users />
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
