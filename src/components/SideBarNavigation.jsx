import React from 'react'
import { AiFillHome, AiOutlineCompass, AiTwotoneSetting } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'



const SideBarNavigation = () => {
    return (
        <div className=' mt-8 h-32  w-full  bg-white flex   items-center flex-col dark:text-slate-400 text-slate-500  font-semibold    dark:bg-slate-800  transition-all rounded-md'>


            <NavLink to='/' className=' h-8 basis-[calc(100%/2)] transition-all mt-1 flex cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900    items-center justify-start w-full    pl-3 dark:border-blue-500 border-blue-700'>
                <AiFillHome size={23} />
                <span className='  mt-1 ml-3'> Home</span>

            </NavLink>

            <NavLink to='/settings' className=' basis-[calc(100%/2)] transition-all h-8 flex cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900    items-center justify-start w-full border-l-[0px]  pl-3 dark:border-blue-500 border-blue-700'>
                <AiTwotoneSetting size={23} />
                <span className='   ml-3'> Settings</span>

            </NavLink>

            

            










        </div>
    )
}

export default SideBarNavigation