import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../Provider/context'
import { Input } from "@nextui-org/react";
import { SearchIcon } from '../icons/SearchIcon';




const FilterInputs = () => {
    const { state, usersArray, setUsersArray, searchValue,
        setSearchValue } = useContext<any>(UserContext)




    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value)
        getFilteredUsers(e.target.value)

    }
    const getFilteredUsers = (filteredItem: any) => {
        const newArray = state.users.filter((user: any) => user.email?.toLowerCase().replace(/\s+/g, '').includes(filteredItem.toLowerCase().replace(/\s+/g, '')))
        setUsersArray(newArray)
    };

    return (
        <>
            {state.users.length > 0
                &&
                <div className="w-1/3 mx-auto">
                    <Input
                        onChange={handleInputChange}
                        label="Search"
                        isClearable
                        radius="lg"
                        classNames={{
                            label: "text-black/50 dark:text-white/90",


                        }}
                        placeholder="Search by email"
                        startContent={
                            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                </div>

            }
        </>

    )
}

export default FilterInputs