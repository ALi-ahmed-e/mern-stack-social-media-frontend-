import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'
import PostsList from '../components/PostsList'
import axios from 'axios'
import AddPost from '../components/AddPost'
import { getPosts } from '../store/posts/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
  const screenWidth = window.innerWidth


  const add = async (e) => {
    e.preventDefault()
    const res = await axios.post("/api/user/follow-user/6421bfe04c237ab5e063b4ec", {}, { withCredentials: true })
    console.log(res)
  }





  return (
    <div className='  w-full min-h-screen flex  justify-between '>
      {screenWidth > 1024 && <LeftSideBar />}
      
      <div className=' flex items-center flex-col   lg:w-1/2 w-full '>
        <AddPost />

        <PostsList showpage='home' />
      </div>


      {screenWidth > 1024 && <RightSideBar />}


    </div>
  )
}

export default Home