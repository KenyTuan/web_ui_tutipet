import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTiktok   } from "react-icons/fa";
import Image from "next/image";
import Link from 'next/link';

export default function Footer() {
  return (
    <>
        <div className='min-h-[250px] bg-[#9a6543] p-2'>
          <div className='flex flex-row justify-between p-4'>
            <div>
              <div className='flex flex-row'>
                <Link href={"https://www.facebook.com/tutipet.pt"} className='mr-2'>
                  <FaFacebookSquare className='icon_ft size-8 fill-white'/>
                </Link>
                <Link href={"https://www.facebook.com/tutipet.pt"} className='mr-2'>
                  <FaInstagram  className='icon_ft size-8 fill-white'/>
                </Link>
                <Link href={"https://www.facebook.com/tutipet.pt"} className='mr-2'>
                  <FaTiktok  className='icon_ft size-8 fill-white'/>
                </Link>
              </div>
              <Image src='/ve1.jpg' width={200} height={150} alt={'meow'} />
            </div>


            <div className='p-8 text-white'>
              <h2 className='p-2'>LIÊN HỆ</h2>
              <p>Email: tutipet@gmail.com</p>
              <p>Phone: 0981988765</p>
              <p>Address: 18A, Cộng Hòa, Tân Bình, TP. Hồ Chí Minh</p>
            </div>
          </div>

          <div className="p-2">
            <p className='text-yellow-50 shadow-orange-600 text-center'>Tuti Pet © 2024 </p>
          </div>
        </div>
    </>
  )
}
