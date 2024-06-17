import { ReactNode } from "react";
import Logo from '../../../public/assets/logo_dark.svg'
import Image from "next/image";

const Wrapper = ({ children, title, description }: { children: ReactNode, title: string, description: ReactNode }) => {

    return (
        <div className="flex min-h-[calc(100vh-48px)]">
            <div className="flex-1 md:py-10 py-4 relative flex justify-center items-center">
                <div className="md:p-10 2sm:p-5 md:w-[560px] bg-white rounded-2xl border border-gray-100 flex flex-col space-y-10">
                    <div className="flex flex-col items-center gap-10">
                        <Image src={Logo} alt="logo" />
                        <p className="text-[#18324D] font-semibold text-3xl text-center">{title}</p>
                        <p className="text-sm text-center font-normal text-[#6E7781] max-w-80">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Wrapper;
