import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard';

const SugFriends = () => {
    const { user } = useSelector(state => state.Auth)
    const [users, setusers] = useState([]);


    const getUsersData = async () => {

        try {
            const res = await axios.get(`/api/user/get-sug-users`)
            // console.log(res.data)
            setusers(res.data.users)
        } catch (error) {
            console.log(error)
        }


    }

    useLayoutEffect(() => {
        user && getUsersData()

    }, [])

    return (
        <div className=' w-full px-4 py-3 flex flex-col bg-white dark:bg-slate-800 dark:text-white rounded-lg '>
            <span className=' mb-4 font-semibold text-slate-600 dark:text-slate-400'>Suggestions for you</span>

            

            {users.map(e => <UserCard key={Math.random()} sugUser={e} currentUser={user}  />)}





        </div>
    )
}

export default SugFriends