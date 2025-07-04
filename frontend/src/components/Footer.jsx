import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='mb-5 w-32' src={assets.logo1} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut animi magnam autem distinctio nisi adipisci nihil recusandae voluptatibus nemo, harum asperiores pariatur ipsum, et ea perspiciatis fuga earum quisquam molestiae?</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-1 font-medium mb-5'>GET IN TOCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-456-7890</li>
                        <li>ajeet@gamil.com</li>
                        
                    </ul>
                </div>

            </div>
            <div>
                <hr/>
                <p className='py-5 text-sm text-center'> copright ....... 2025@ - All Right Reserved</p>
            </div>


        </div>
    )
}

export default Footer