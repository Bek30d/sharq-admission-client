import React from 'react'

const Wrapper = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <div className='flex flex-col space-y-10 bg-[#FFFFFF] rounded-lg md:p-10 p-5 mt-8'>
            <p className='md:text-3xl text-2xl text-[#18324D] font-semibold'>{title}</p>
            {children}
        </div>
    )
}

export default Wrapper