import React from 'react'
import { Box, Typography } from '@mui/material';
import Image from "next/image";

export default function page() {
  return (
    <>
      <div className='py-2 px-4'>
        <div className='flex justify-center items-center mb-2'>
          <Image src='/petip.jpg' width={500} height={150} alt={'meow'} className='items-center' />
        </div>
        <div className={"flex flex-row mb-2 py-4 px-10"}>
          <Image src='/boi.jpg'
            alt={"Hình Giới Thiệu"} 
            className=" ml-4 w-1/3 rounded-lg" 
            height={250}
            width={500}/>
          <div className="m-4 p-5 px-28 w-2/3 mr-4">
              <h2 className="text-center p-2 uppercase "> Ồ <br/>Hồ bơi có an toàn cho thú cưng của bạn?</h2>
              <p className="text-xl p-2 text-center italic">
                Hồ bơi là nơi tuyệt vời để gia đình và thú cưng của bạn tận hưởng kỳ nghỉ hè. 
                Đó là giải pháp hoàn hảo để hạ nhiệt, tắm nắng và tận hưởng nhiều niềm vui. 
                Tuy nhiên, giống như trẻ nhỏ, chó của bạn có thể có nguy cơ bị thương nếu không được giám sát đúng cách.
                Không phải tất cả các con chó đều là những tay bơi giỏi và không phải tất cả các hồ bơi đều được coi là thân thiện với chó.
              </p>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 py-2 px-12'>

          <div className="p-4 shadow-lg rounded-sm hover:bg-slate-50 " >
            <div className='h-[400px] object-contain flex justify-center items-center'>
              <Image src='/tia.jpg' width={400} height={400} alt={'meow'} className="object-contain h-[400px] p-4" />
            </div>
            <div className='px-2'>
              <h6 className='mb-2 font-semibold text-xl line-clamp-1 min-h-3'>
                Lời khuyên khi chuyển đến nhà mới của chó
              </h6>
              <p className='text-base font-light line-clamp-4 min-h-24'>
                Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
              </p>
            </div>
          </div>


          <div className="p-4 shadow-lg rounded-sm hover:bg-slate-50 " >
            <div className='h-[400px] object-contain flex justify-center items-center'>
              <Image src='/tia1.jpg' width={400} height={400} alt={'meow'} className="object-contain h-[400px] p-4" />
            </div>
            <div className='px-2'>
              <h6 className='mb-2 font-semibold text-xl line-clamp-1 min-h-3'>
                Cách chăm sóc, tỉa lông cho mèo đúng cách 
              </h6>
              <p className='text-base font-light line-clamp-4 min-h-24'>
                Một số con mèo có thể dễ dàng trở nên lồng lộn và xinh đẹp nhờ một phần vào cách chăm sóc cũng như cách tỉa lông đúng cách...
              </p>
            </div>
          </div>

          <div className="p-4 shadow-lg rounded-sm hover:bg-slate-50 " >
            <div className='h-[400px] object-contain flex justify-center items-center'>
              <Image src='/care.jpg' width={400} height={400} alt={'meow'} className="object-contain h-[400px] p-4" />
            </div>
            <div className='px-2'>
              <h6 className='mb-2 font-semibold text-xl line-clamp-1 min-h-3'>
                Chăm sóc thú cưng
              </h6>
              <p className='text-base font-light line-clamp-4 min-h-24'>
                Cùng thú cưng chăm sóc cơ thể, nâng niu và chăm sóc da mặt hay body cùng nhau cũng là một việc thú vị...
              </p>
            </div>
          </div>

          <div className="p-4 shadow-lg rounded-sm hover:bg-slate-50 " >
            <div className='h-[400px] object-contain flex justify-center items-center'>
              <Image src='/care3.jpg' width={400} height={400} alt={'meow'} className="object-contain h-[400px] p-4" />
            </div>
            <div className='px-2'>
              <h6 className='mb-2 font-semibold text-xl line-clamp-1 min-h-3'>
                Tại sao mèo luôn đói bụng
              </h6>
              <p className='text-base font-light line-clamp-4 min-h-24'>
                Một số con mèo có thể dễ dàng trở thành những kẻ kén ăn, trong khi những con khác vui vẻ ăn tối, 
                nhai và ăn nhẹ với bất kỳ món ăn nào có sẵn. Nhưng nếu con mèo của bạn thèm ăn… 
              </p>
            </div>
          </div>


          <div className="p-4 shadow-lg rounded-sm hover:bg-slate-50 " >
            <div className='h-[400px] object-contain flex justify-center items-center'>
              <Image src='/care2.jpg' width={400} height={400} alt={'meow'} className="object-contain h-[400px] p-4" />
            </div>
            <div className='px-2'>
              <h6 className='mb-2 font-semibold text-xl line-clamp-1 min-h-3'>
                Lời khuyên khi chuyển đến nhà mới của chó
              </h6>
              <p className='text-base font-light line-clamp-4 min-h-24'>
                Chuyển nhà là một chuyện vô cùng khó khăn đối với thành viên trong gia đình, khi chuyển trường, rời xa bạn bè cũ...
              </p>
            </div>
          </div>

          <div className="p-4 shadow-lg rounded-sm hover:bg-slate-50 " >
            <div className='h-[400px] object-contain flex justify-center items-center'>
              <Image src='/care1.jpg' width={400} height={400} alt={'meow'} className="object-contain h-[400px] p-4" />
            </div>
            <div className='px-2'>
              <h6 className='mb-2 font-semibold text-xl line-clamp-1 min-h-3'>
              Lời khuyên khi chải lông cho bé mèo
              </h6>
              <p className='text-base font-light line-clamp-4 min-h-24'>
              Việc chọn một chiếc lược êmmm và mềmmm để chải lông cho bé mèo nhà bạn, bạn đã biết chưa?
              </p>
            </div>
          </div>

        </div>
      </div>
    
    
    </>
  )
}
