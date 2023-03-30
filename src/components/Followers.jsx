import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const Followers = () => {
    const { user } = useSelector(state => state.Auth)

    return (
        <div className=' px-4 py-3  w-full p-2 flex flex-col bg-white dark:bg-slate-800 dark:text-white rounded-lg my-10'>
            <span className=' mb-4 font-semibold text-slate-600 dark:text-slate-400'>Following you</span>

            {user.followers?.map(usr => <UserCard key={Math.random()} currentUser={user} user={usr} />)}




        </div>
    )
}

export default Followers