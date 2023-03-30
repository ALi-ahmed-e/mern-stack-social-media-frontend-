import React from 'react'
import Followers from './Followers'
import SugFriends from './SugFriends'

const RightSideBar = () => {
  return (
    <div className=' w-1/4 h-full   lg:block hidden p-3'>
        <SugFriends />
        <Followers />

    </div>
  )
}

export default RightSideBar