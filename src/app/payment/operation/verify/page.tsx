'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import OperationLayout from '@/layouts/OperationLayout'
import PaymentLayout from '@/layouts/PaymentLayout'
import { useRouter } from 'next/navigation';
import React from 'react'



const Verify = () => {
    const router = useRouter()

    return (
        <PaymentLayout>
            <OperationLayout>
                <div className='flex-1 flex flex-col gap-4'>
                    <p className='text-[#18324D] font-medium'>Nomerni tasdiqlash</p>
                    <div className="flex-1 w-full">
                        <label
                            htmlFor="cardNumber"
                            className="text-[#424A53] font-medium text-sm"
                        >
                            Tasdiqlash kodi
                        </label>
                        <div className='relative'>
                            <Input
                                id="cardNumber"
                                className="border-[#D0D7DE] bg-[#F0F2F5] outline-none !py-4 !px-3 text-[#24292F] text-lg font-medium placeholder:text-[#6E7781] "
                                placeholder="Enter the code"
                            />
                            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-sm text-[#18324D] w-8 h-8 rounded-full border border-[#1CB854]'>
                                <span>49</span>
                            </div>
                        </div>
                    </div>
                    <p className='text-[#18324D] font-medium'>Qayta yuborish</p>
                    <p className='text-center'>Tasdiqlash kodi +998 93 *** ** 15 <br />
                        yuborildi
                    </p>
                    <div className='flex gap-4'>
                        <Button onClick={() => router.back()} className="w-full !bg-white !text-[#0550AE] border border-[#0550AE]">Orqaga</Button>
                        <Button
                            type="submit"
                            className="!bg-[#18324D] w-full !py-[10px] h-auto"
                            onClick={() => router.push('/')}
                        >
                            Jo’natish
                        </Button>
                    </div>
                </div>
            </OperationLayout>
        </PaymentLayout>
    )
}

export default Verify