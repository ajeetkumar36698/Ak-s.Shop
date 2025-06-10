import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla culpa odio illum suscipit ipsa aliquid maiores. Ea suscipit impedit eveniet tenetur, incidunt id adipisci minima dolore accusantium quidem! Modi, laborum?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla culpa odio illum suscipit ipsa aliquid maiores. Ea suscipit impedit eveniet tenetur, incidunt id adipisci minima dolore accusantium quidem! Modi, laborum?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla culpa odio illum suscipit ipsa aliquid maiores. Ea suscipit impedit eveniet tenetur, incidunt id adipisci minima dolore accusantium quidem! Modi, laborum?</p>


        

        </div>

      </div>
      <div >

      </div>
    </div>
  )
}

export default About