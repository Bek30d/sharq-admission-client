'use client'

import BaseIcon from '@/components/icons/BaseIcon';
import { Button } from '@/components/ui/button'
import AdminProfileLayout from '@/layouts/AdminProfileLayout'
import React, { useState } from 'react'
import AddModeratorBar from '../components/AddModeratorBar';

const Moderators = () => {
    const [isShowSideBar, setIsShowSideBar] = useState(false);

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
                <p className="w-[265px] pl-5 text-[#57606A] font-medium">
                    Ariza raqami
                </p>
                <p className="w-[265px] pl-5 text-[#57606A] font-medium">
                    Berilgan sana
                </p>
                <p className="w-[265px] pl-5 text-[#57606A] font-medium">
                    Fakultet nomi
                </p>
                <p className="w-[265px] pl-5 text-[#57606A] font-medium">
                    Ariza statusi
                </p>
            </div>

            <AddModeratorBar
                isShowSideBar={isShowSideBar}
                setIsShowSideBar={setIsShowSideBar}
            />

        </AdminProfileLayout>
    )
}

export default Moderators