import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPlice = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Esay Echange Policy</p>
                <p className='text-gray-400'>We Offer Hassle free Excahnge Ploicy</p>
            </div>
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>y days Return Policy</p>
                <p className='text-gray-400'>We Provide 7 free reaturn Policy</p>
            </div>
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Best customer Support</p>
                <p className='text-gray-400'>we provide 24/7 customer support</p>
            </div>
        </div>
    )
}

export default OurPlice