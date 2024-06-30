import React from 'react'
import { Box, Button, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link';

export default function page() {
  return (
    <>
        <div className='py-4 px-8 '>
            <div className='flex flex-row justify-between items-center mb-8'>
                <div className='flex flex-col w-3/12 p-2 '>
                    <Typography variant='h6' gutterBottom>
                        PET SERVICE
                    </Typography>
                    <Typography variant='h3' sx={{fontWeight: 700}}  gutterBottom>
                        DỊCH VỤ
                    </Typography>
                    <Divider sx={{marginBottom: 2}}/>
                    <Typography variant='h3' gutterBottom >
                        Hàng Đầu             
                    </Typography>
                    <Image src="/dogcat.png" width={260} height={260} alt={'cho meo'} />
                </div>

                <div className='w-9/12 '>
                    <div className='flex flex-col justify-between items-end pr-6'>
                        <Link href={"/"} className=''><p>Nhu Cầu Dịch Vụ</p></Link>
                    </div>
                    <div className='grid grid-cols-3 gap-4  p-2'>
                        
                        <Box p={2} sx={{ border:'2px solid black', boxShadow: 1,borderRadius: 2, '&:hover': {color: 'ButtonHighlight',backgroundColor: 'burlywood'} }}>
                            <Image src="/iconsport.png" width={70} height={70} alt={'dang cap'} />
                            <Typography variant='h6' gutterBottom>
                                ĐẲNG CẤP
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                            Chúng tối biết cách làm thế nào để thú cưng của bạn trở nên đẳng cấp và 
                            cá tính hơn. Với dịch vụ cắt tỉa lông thú cưng chúng tôi sẽ giúp các bé trở thành phiên bản hoàn hảo nhất.
                            </Typography>
                        </Box>
                        <Box p={2} sx={{ border: '2px solid black', boxShadow: 1,borderRadius: 2,
                        '&:hover': {color: 'ButtonHighlight',backgroundColor: 'burlywood'}}}>
                            <Image src="/house.png" width={70} height={70} alt={'dang cap'} />
                            <Typography variant='h6' gutterBottom>
                                SHOP
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                            Cùng với hơn 3.000 khách hàng đã luôn tin tưởng, đồng hành, chúng tôi luôn đặt ra những mục tiêu
                            và thử thách mới. PET SERVICE cung cấp các sản phẩm, phụ kiện rất đa dạng...
                            </Typography>
                        </Box>

                        <Box p={2} sx={{ border: '2px solid black', boxShadow: 1,borderRadius: 2,
                        '&:hover': {color: 'ButtonHighlight',backgroundColor: 'burlywood'} }}>
                            <Image src="/pet.png" width={70} height={70} alt={'dang cap'} />
                            <Typography variant='h6' gutterBottom>  
                            NGHỈ DƯỠNG
                            </Typography>
                            <Typography variant='h6' gutterBottom>
                            Mọi hành động ở PET SERVICE đều bắt đầu từ sứ mệnh Trao Gửi Yêu Thương. 
                            Mọi thú cưng mới khi đến với chúng tôi đều được quan tâm đặc biệt bởi đội ngũ Nhân viên nhiều kinh nghiệm...
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>
            
            <Paper elevation={3}>
              <Box sx={{p: 2, borderRadius: 2,  display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 2,marginBottom: 5}} >
                <div className="flex flex-col justify-between items-center">
                  <div className='self-center'>
                  <Image src='/flower.png' width={70} height={70} alt={'cho meo'} />
                  </div>
                  <div className ='text-center p-4'>
                    <h2 className=' text-amber-900'>CHÚNG TÔI Ở ĐÂY ĐỂ CHĂM SÓC THÚ CƯNG CỦA BẠN!</h2>
                    <h6 className='p-4 font-medium text-xl'>Vui lòng điền thông tin vào biểu mẫu để đặt lịch chăm sóc cho thú cưng của bạn tại dịch vụ của {"TuTi`s"} Pet.
                    Sau khi nhận được yêu cầu, nhân viên của chúng tôi sẽ liên hệ xác nhận với bạn qua điện thoại. </h6>
                    <p className='text-base italic'>CẢM ƠN BẠN ĐÃ TIN TƯỞNG VÀ SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI!</p>
                  </div>
                  </div>
              <Stack direction="row"> 
                <form>

                  <Grid item xs ={12}>
                    <Stack direction="row" spacing ={5}  padding={2} >
                      <Grid item xs ={8}> 
                        <TextField id="outlined-basic" label="Họ và tên" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item xs={8} >
                        <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth  />
                      </Grid>
                    </Stack>
                  </Grid>

                  <Grid item xs ={8}>
                    <Stack direction="row" spacing ={5} justifyContent={"flex-end"} padding={2}> 
                      <input type="date" placeholder='Ngay' className="w-full h-10 px-4 border-2 "  />
                      <input type="time" placeholder='Gio' className="w-full h-10 px-4 border-2 "/>   
                    </Stack>
                  </Grid>
                  <Grid item xs ={8}>
                    <Stack direction="row" spacing ={5} justifyContent={"flex-start"} padding={2}> 
                      <TextField id="multiline" label="Ghi chú" multiline maxRows={4}/>
                    </Stack>
                  </Grid>
                  
                  <Grid item xs ={8}>
                    <Stack direction="row" spacing ={2} justifyContent={"flex-end"}> 
                      <Button variant="contained" color="success" className="bg-green-600">ĐẶT HẸN NGAY</Button>
                    </Stack>
                  </Grid>
                </form>
              </Stack>
            </Box>
          </Paper>
        </div>
    </>
  )
}
