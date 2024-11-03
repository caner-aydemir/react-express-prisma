import React, { useState, useMemo, FC, useContext, useReducer, useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip, Chip, Spinner, Pagination } from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { truncateText } from "../../helpers/truncateText";
import { UserData } from '../../interfaces/Users';

interface USERPROPS {
    usersArray: UserData[]
    deleteUserState: (deletedUser: UserData) => void
    setOpenUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>
    setSelectUserData: (userData: UserData) => void
    searchValue: string
}
const UserTable: FC<USERPROPS> = ({ usersArray, searchValue, deleteUserState, setOpenUpdateUserModal, setSelectUserData }) => {
    const columns = [
        { key: "name", label: "NAME" },
        { key: "email", label: "EMAIL" },
        { key: "age", label: "AGE" },

        { key: "actions", label: "ACTIONS" },
    ];
    const HighlightText = ({ text }: { text: string; }) => {
        console.log("text", text)
        console.log("searchValue", searchValue)
        if (!searchValue.trim()) {
            console.log("yes")
            return <span>{text}</span>;
        }

        // Arama metnini büyük/küçük harf duyarsız bir şekilde bulmak için regex kullanıyoruz
        const regex = new RegExp(`(${searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchValue.toLowerCase() ? (
                        // Eşleşen kısımlar sarı renkle boyanır
                        <span key={index} className="bg-yellow-400">{part}</span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };

    const renderCellContent = (item: any, columnKey: string) => {

        switch (columnKey) {
            case "name":
                return (
                    <User
                        name={<span className='text-xs '>{truncateText(item.name)}</span>}
                        avatarProps={{
                            src: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
                        }}
                    />
                );
            case "email":
                return (
                    <span className='test-xs'>{truncateText(item.email)}</span>
                )
            case "age":
                return <span className='text-xs'>{item.age}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-5  justify-center">
                        <Tooltip content="Edit user">
                            <span className="text-xl text-default-400 cursor-pointer active:opacity-50"
                                onClick={() => openUpdateModalToggle(item)}  >
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-xl text-danger cursor-pointer active:opacity-50" onClick={() => deleteUserState(item)}>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    };

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 7;

    const pages = Math.ceil(usersArray?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return usersArray.slice(start, end);
    }, [page, usersArray]);


    const openUpdateModalToggle = (userData: UserData) => {
        setOpenUpdateUserModal(true)
        setSelectUserData(userData)
    }

    return (
        <Table
            aria-label="Example table with client side pagination"
            className='w-2/3 mx-auto xs:w-screen '
            color={"default"}
            selectionMode="single"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        >
            <TableHeader columns={columns} >

                {(column) => <TableColumn className='w-1/4 text-center' key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items} >
                {(item) => (
                    <TableRow key={item.id}>
                        {columns.map(({ key }) => (
                            <TableCell key={key} className={`text-black ${(key === "age" || key === "actions") && "text-center"}`}>
                                {key === "email" ? (
                                    <Tooltip content={item[key]} className='bg-gray-800 text-white'>
                                        <span className='w-auto text-center'>
                                            {renderCellContent(item, key)}
                                        </span>
                                    </Tooltip>
                                ) : (
                                    <span>{renderCellContent(item, key)}</span>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default UserTable