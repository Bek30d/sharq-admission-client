import React from 'react'
import { moderatorI } from '../moderators/page'

const ModeratorItem = ({ id, full_name, phone, user_type }: moderatorI) => {
    return (
        <div className='py-[22px] bg-white rounded-lg flex mb-2 cursor-pointer'>
            <p className="w-[60px] text-center text-[#24292F] text-sm font-medium">
                {id}
            </p>
            <p className="w-[265px] text-center pl-5 text-[#24292F] text-sm font-medium">
                {full_name}
            </p>
            <p className="w-[265px] text-center pl-5 text-[#24292F] text-sm font-medium">
                {phone}
            </p>
            <div className="flex-1 text-end px-5 text-[#24292F] text-sm font-medium">
                <button onClick={() => { console.log('object'); }}>
                    delete
                    {/* <BaseIcon name='deleteOutline' width={20} height={20} viewBox="0 0 24 24" color='#24292F' /> */}
                </button>
            </div>
        </div>
    )
}

export default ModeratorItem