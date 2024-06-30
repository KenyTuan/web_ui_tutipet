import ShoppingCart from '@/components/ui/public/carts/ShoppingCart'
import React from 'react'

export default function page() {
  return (
    <>
      <div className='py-2 px-16'>
        <div className='px-4 mb-6 ' >
            <h3 className='font-bold text-4xl'>
                Giỏ Hàng Của Tôi
            </h3>
        </div>
        <hr className='border-b-2 mb-4'/>
        <div className='px-8 py-2'>
          <ShoppingCart />
        </div>
      </div>
    </>
  )
}
