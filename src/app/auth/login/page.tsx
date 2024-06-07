'use client'
import React from 'react'
import Wrapper from '../Wrapper'
import { Form } from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

type FormData = z.infer<typeof schema>;

const schema = z.object({
    password: z.string().min(3, "Password is required"),
})


const Login = () => {
    const { phone, login } = useAuthStore()
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await login(data.password)
        response === 1 ?
            router.push('/auth/verify') :
            alert('Xatolik yuz berdi')
    };

    return (
        <Wrapper
            title='2024-2025-o‘quv yili uchun ariza topshirish'
            description={
                <span>
                    <span className='text-[#0055FB]'>{phone} </span>
                    raqamingizga kelgan
                    tasdiqlash kodini kiriting
                </span>
            }>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Form {...form}>
                    <div className='flex flex-col md:space-y-10 space-y-6'>
                        <div className="flex-1 w-full">
                            <label
                                htmlFor="phone"
                                className="text-[#424A53] font-medium text-sm"
                            >
                                <div className='flex justify-between items-center'>
                                    <p>
                                        Telefon raqam
                                    </p>
                                    <Button className="!text-[#0055FB] p-0" variant={'link'} onClick={() => router.back()}>Telefon raqamni o’zgartirish</Button>
                                </div>
                            </label>
                            <Input
                                disabled
                                value={phone}
                                id="phone"
                                type='tel'
                                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                                placeholder="998xx xxx-xx-xx"
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label
                                htmlFor="password"
                                className="text-[#424A53] font-medium text-sm"
                            >
                                Tasdiqlash kodi
                            </label>
                            <Input
                                id="password"
                                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                                placeholder="Tasdiqlash kodi"
                                {...form.register("password")}
                            />
                            <span className="text-red-400 text-xs">
                                {form.formState.errors.password?.message}
                            </span>
                        </div>
                        <Button className="!bg-[#18324D] w-full !py-[14px] h-auto">
                            Davom etish
                        </Button>
                        <p className='font-medium text-sm text-[#6E7781] text-center'>kodni qayta yuborish uchun <span className='text-[#0055FB]'>59</span> soniya kuting</p>
                    </div>

                </Form>
            </form>
        </Wrapper>
    )
}

export default Login