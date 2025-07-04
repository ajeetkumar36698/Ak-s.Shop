import React, { useContext, useEffect, useState } from 'react'
import { useCallback } from 'react';

import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import ReletedProduct from '../components/ReletedProduct';

const Product = () => {
  const {productId}=useParams();
  const {products,currency ,addTocart}=useContext(ShopContext);
  const [productdata,setproductData]=useState(false);
  const [image,setImage]=useState('')
  const [size ,setSize]=useState('')
  


  const fetchProductData=async ()=>{
    products.map((item)=>{
      if(item._id===productId){
        setproductData(item)
        setImage(item.image[0])
        // console.log(item)
        return null
      }

    })

  }
  useEffect(()=>{
    fetchProductData()

  },[productId])

  
  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-95'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productdata.image.map((item,index)=>(
                <img src={item} key={index} className='w-[20%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%'>
            <img className='w-full h-auto' src={image} alt="" />

          </div>

        </div>
        {/* ------product info------------------ */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
          <div className='flex items-center gap-1 mt-2 '>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon}  alt="" className="w-3 5" />
            <img src={assets.star_icon}  alt="" className="w-3 5" />
            <img src={assets.star_icon}  alt="" className="w-3 5" />
            <img src={assets.star_dull_icon}  alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>

          </div>
          <p>{currency}{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productdata.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500': ''}`} key={index}>{item}</button>

              ))}

            </div>

          </div>
          <button onClick={()=> addTocart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CARD</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p> Case on Delivert is available on this product</p>
            <p>
              Esay reaturn and exchange policy within 7 days 
            </p>

          </div>

        </div>

      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review (122)</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum harum voluptas laboriosam reprehenderit autem labore magnam quibusdam. Excepturi, assumenda quibusdam fugiat iure quae libero praesentium natus unde quidem numquam.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur eius, explicabo aut, quia ullam quasi ipsum sapiente at voluptas assumenda amet dignissimos ratione ad nemo mollitia minus sint quisquam inventore.</p>

        </div>
         
      </div>
      {/* display realeted products */}
      <ReletedProduct category={productdata.category} subCategory={productdata.subCategory}/>

    </div>
  ):<div className='opacity-0'></div>
}

export default Product