import { useState } from "react";
import { AiFillPlusCircle } from 'react-icons/ai'


import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Stories = () => {
    const screenWidth = window.innerWidth







    return (
        <div className=' overflow-hidden w-full h-48 px-2  my-2  '>
            <Swiper
                freeMode={true}
                grabCursor={true}
                slidesPerView={5}
                navigation={true}
                pagination={{ clickable: true, }}
                modules={[FreeMode, Pagination]}
                // className=" sm:ml-0 -ml-10"
                >

                {new Array(7).fill('').map(movie =>
                    <SwiperSlide key={Math.random()} className=' sm:mx-8 md:mx-3 mx-10' >


                        <div key={Math.random()} className=' h-full w-32   rounded-lg overflow-hidden   justify-center mx-2 flex'>


                            <div className=' h-full w-full relative   overflow-hidden flex  justify-center'>
                                <img className=' w-full h-full' src="https://i.pinimg.com/736x/26/12/73/261273da88b3732c008a871d0284642b--men-photography-portrait-male-photography.jpg" alt="" />
                                <AiFillPlusCircle className=' text-indigo-500 absolute bottom-2  left-2 cursor-pointer  bg-white rounded-full hover:text-indigo-600' size='24' />

                            </div>
                        </div>

                    </SwiperSlide>

                )}
            </Swiper>






            {/* {new Array(7).fill('').map(e =>

                <div key={Math.random()} className=' h-full w-32   rounded-lg overflow-hidden   justify-center mx-2 flex'>


                    <div className=' h-full w-full relative   overflow-hidden flex  justify-center'>
                        <img className=' w-full h-full' src="https://i.pinimg.com/736x/26/12/73/261273da88b3732c008a871d0284642b--men-photography-portrait-male-photography.jpg" alt="" />
                        <AiFillPlusCircle className=' text-indigo-500 absolute bottom-2  left-2 cursor-pointer  bg-white rounded-full hover:text-indigo-600' size='24' />

                    </div>
                </div>

            )} */}








        </div>)
}

export default Stories