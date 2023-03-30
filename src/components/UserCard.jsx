import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { togglefollowUser } from '../store/users/userSlice'
const UserCard = ({ user, currentUser,sugUser }) => {
    const [userData, setuserData] = useState();
    const [followed, setfollowed] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserData = async () => {

        try {
            const res = await axios.get(`/api/user/get-user/${user}`)
            setfollowed(res.data.followers.includes(currentUser._id))
            setuserData(res.data)
        } catch (error) {
            console.log(error)
        }


    }

    useLayoutEffect(() => {
       if (!sugUser) {
        user && getUserData()
       }else if(currentUser){
        setuserData(sugUser)
        setfollowed(sugUser.followers.includes(currentUser._id))
       }        

    }, [])

    const toggleFollowUser = async () => {
        dispatch(togglefollowUser(userData._id))
        setfollowed(!followed)

    }

    return (
        <>
        {userData&&<div className=' flex items-center justify-between my-2  border-slate-700/70'>
            <div className=' flex items-center' onClick={()=>{  navigate(`/profile/${userData.username}/${userData._id}`)}}>
                <img className=' w-10 h-10 mr-3 rounded-full ' src={userData?.profileImage} alt="" />
                <span className=" hover:underline cursor-pointer ">{userData?.username}</span>
                
            </div>


            <button className=' ml-1 px-[4px] text-white py-[1px] rounded-sm bg-indigo-600 hover:bg-indigo-700' onClick={toggleFollowUser}>{followed ? 'unFollow' : 'Follow'}</button>



        </div>}
        </>
    )
}

export default UserCard