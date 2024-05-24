import React from 'react'
import Logo from '../../../../public/assets/logo_dark.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const PaymentDetailsCard = () => {
    return (
        <div className='flex flex-col gap-4 p-4 shadow-md bg-white rounded w-[440px]'>
            <Image src={Logo} alt="logo" />
            <p className='text-[#18324D]'>OOO “Sharq university”</p>
            <Button>
                To’lov ma’lumotlari
            </Button>
        </div>
    )
}

export default PaymentDetailsCard