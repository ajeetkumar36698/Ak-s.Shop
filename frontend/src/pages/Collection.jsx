import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteProductr, setFilterProductr] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevent')


  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))

    }
    else {
      setCategory(prev => [...prev, e.target.value])

    }
  }
  const toggleSubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))

    }
    else {
      setSubCategory(prev => [...prev, e.target.value])

    }
  }
  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }




    if (subCategory.length > 0) {
      console.log(subCategory)
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))

    }
    setFilterProductr(productCopy)
  }
  const sortProduct = () => {
    let fpCopy = filteProductr.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProductr(fpCopy.sort((a, b) => (a.price - b.price)))
        break
      case 'high-low':
        setFilterProductr(fpCopy.sort((a, b) => (b.price - a.price)))
        break
      default:
        applyFilter()
        break
    }

  }




  useEffect(() => {
    applyFilter()

  }, [category, subCategory,search,showSearch,products])

  useEffect(() => {
    sortProduct()


  }, [sortType])


  return (
    <div className='flex flex-row sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? '' : 'rotate-90'}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* category */}
        <div className={`border broder-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={togglecategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={togglecategory} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={togglecategory} /> Kids
            </p>

          </div>

        </div>
        {/* subcategory */}


        <div className={`border broder-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubcategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubcategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubcategory} /> Winterwear
            </p>

          </div>

        </div>
      </div>
      {/* right Side */}
      <div className='flex-1'>
        <div className='flex justify-baseline text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={'COLLECTIONS'} />
          {/* product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
            <option value="relavent">sort by: Relavent</option>
            <option value="low-high">sort by: Low-High</option>
            <option value="high-low">sort by: High-Low</option>
          </select>

        </div>
        {/* map Prouct */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteProductr.map((item, index) => (

              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }

        </div>

      </div>



    </div>
  )
}

export default Collection