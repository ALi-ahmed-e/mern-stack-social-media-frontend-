import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SideBarNavigation from './SideBarNavigation'

const LeftSideBar = () => {
    const { user } = useSelector(e => e.Auth)
    const navigate = useNavigate()

    // console.log(user)

    return (
        <div className=' w-1/4    h-screen  lg:block hidden p-3'>

            <div onClick={()=> navigate(`/profile/${user.username}/${user._id}`)} className=' w-full h-14 bg-white flex  items-center  font-semibold px-3 justify-start hover:cursor-pointer dark:bg-slate-800 dark:text-white dark:hover:bg-slate-800/80 hover:bg-slate-50 transition-all rounded-md'>
                <img src={user.profileImage} alt="userimage" className=' w-10 h-10 rounded-full mr-5' />

                {user.username}
            </div>


            <SideBarNavigation />


        </div>
    )
}

export default LeftSideBar