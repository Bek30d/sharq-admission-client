'use client'
import React, { useState } from 'react'
import Wrapper from '../Wrapper'
import { Form } from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type FormData = z.infer<typeof schema>;

const schema = z.object({
    passport: z.string().min(3, "Passport data is required"),
    birthDate: z.string().min(3, "Birth date is required"),
})


const Verify = () => {
    const [displayValue, setDisplayValue] = useState<string>('');
    const [customDisplayValue, setCustomDisplayValue] = useState<string>('');

    const router = useRouter();

    const formatDate = (value: string) => {
        const cleanedValue = value.replace(/\D+/g, ''); // Remove all non-digit characters
        const day = cleanedValue.slice(0, 2);
        const month = cleanedValue.slice(2, 4);
        const year = cleanedValue.slice(4, 8);

        let formattedValue = day;
        if (month) formattedValue += ` - ${month}`;
        if (year) formattedValue += ` - ${year}`;

        return formattedValue;
    };

    const unformatDate = (value: string) => {
        return value.replace(/\D+/g, ''); // Remove all non-digit characters
    };

    const formatPassportField = (value: string) => {
        const cleanedValue = value.replace(/\W+/g, ''); // Remove all non-word characters
        const part1 = cleanedValue.slice(0, 2);
        const part2 = cleanedValue.slice(2, 9);

        let formattedValue = part1;
        if (part2) formattedValue += ` ${part2}`;

        return formattedValue.toUpperCase();
    };

    const unformatPassportField = (value: string) => {
        return value.replace(/\W+/g, ''); // Remove all non-word characters
    };

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            birthDate: '',
            passport: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => router.push('/personal-info');

    return (
        <Wrapper
            title='Ariza topshirish uchun o’z akkauntingizni yarating'
            description="Pasport yoki ID raqamva tug’ilgan kuningizni kiriting">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Form {...form}>
                    <div className='flex flex-col md:space-y-10 space-y-6'>
                        <div className="flex-1 w-full">
                            <label
                                htmlFor="phone"
                                className="text-[#424A53] font-medium text-sm"
                            >
                                Pasport yoki ID raqami
                            </label>
                            <Input
                                id="phone"
                                type='tel'
                                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                                value={customDisplayValue}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const formattedValue = formatPassportField(inputValue);
                                    setCustomDisplayValue(formattedValue);
                                    form.setValue('passport', unformatPassportField(inputValue));
                                }}
                                placeholder="__ _______"
                            />
                            <span className="text-red-400 text-xs">
                                {form.formState.errors.passport?.message}
                            </span>
                        </div>
                        <div className="flex-1 w-full">
                            <label
                                htmlFor="password"
                                className="text-[#424A53] font-medium text-sm"
                            >
                                Tug’ilgan kun
                            </label>
                            <Input
                                id="password"
                                type='text'
                                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                                placeholder="dd - mm - yyyy"
                                value={displayValue}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const formattedValue = formatDate(inputValue);
                                    setDisplayValue(formattedValue);
                                    form.setValue('birthDate', unformatDate(inputValue));
                                }}
                            />
                            <span className="text-red-400 text-xs">
                                {form.formState.errors.birthDate?.message}
                            </span>
                        </div>
                        <Button className="!bg-[#18324D] w-full !py-[14px] h-auto">
                            Davom etish
                        </Button>
                    </div>

                </Form>
            </form>
        </Wrapper>
    )
}

export default Verify