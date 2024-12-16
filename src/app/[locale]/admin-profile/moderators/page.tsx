'use client'

import { Button } from '@/components/ui/button'
import AdminProfileLayout from '@/layouts/AdminProfileLayout'
import React, { useEffect, useState } from 'react'
import AddModeratorBar from '../components/AddModeratorBar';
import { useAdminStore } from '@/store/admin.store';
import ModeratorItem from '../components/ModeratorItem';

export type moderatorI = {
    full_name: string
    id: number
    phone: string
    user_type: string
}

const Moderators = () => {
    const [isShowSideBar, setIsShowSideBar] = useState(false);
    const { getModerators, moderators } = useAdminStore()

    useEffect(() => {
        getModerators()
    }, [])


    return (
        <AdminProfileLayout>
            <div className='flex justify-end mb-3'>
                <Button
                    className="flex gap-2 items-cener border !border-[#338AF3] !bg-white py-1"
                    onClick={() => setIsShowSideBar(!isShowSideBar)}
                >
                    <p className='text-[#0055FB] font-light text-2xl'>+</p>
                    <p className="text-[#0055FB] mt-1">Yangi moderator qo`shish</p>
                </Button>
            </div>
            <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 ">
                <p className="w-[60px] text-center  text-[#57606A] font-medium">No</p>
                <p className="w-[265px] text-center pl-5 text-[#57606A] font-medium">
                    To`liq ismi
                </p>
                <p className="w-[265px] pl-5 text-center text-[#57606A] font-medium">
                    Telefon raqami
                </p>
            </div>
            {
                moderators.map((item, index) => (
                    <ModeratorItem
                        key={index}
                        {...item}
                    />
                ))
            }

            <AddModeratorBar
                isShowSideBar={isShowSideBar}
                setIsShowSideBar={setIsShowSideBar}
            />

        </AdminProfileLayout>
    )
}

export default Moderators