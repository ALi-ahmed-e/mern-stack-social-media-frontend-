import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchUsers } from '../store/search/SearchSlice'
import { togglefollowUser } from '../store/users/userSlice'

const Search = () => {

  const { user } = useSelector(state => state.Auth)
  const { page, docs, users, query } = useSelector(state => state.search)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [usersArr, setusersArr] = useState([]);






  const nextPage = (pg) => {
    dispatch(searchUsers({ page: pg, query }))
  }

  const getUsersData = async () => {

    try {
      const res = await axios.get(`/api/user/get-sug-users`, '', { withCredentials: true })
      setusersArr(res.data.users)
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    users != ''&& setusersArr(users)
  }, [users]);

  useEffect(() => {
    getUsersData()
  }, []);



  return (
    <>
      <div className=' bg-white dark:bg-slate-800 shadow-md dark:border-[1px] border-slate-700 w-[96%] h-fit p-4 rounded-md max-w-3xl mx-auto my-10'>



        {usersArr.map(usr => <div key={Math.random()} className=' flex items-center justify-between border-b-[1px] border-slate-500/40 py-3'>
          <div className=' flex dark:text-white cursor-pointer' onClick={()=>navigate(`/profile/${usr.username}/${usr._id}`)}>

            <img className=' w-14 h-14 rounded-lg' src={usr?.profileImage} alt="" />
            <div className=' flex flex-col mx-4 text-lg'>
              <span className=' font-semibold hover:underline'>{usr?.username}</span>
              <span className=' text-sm dark:text-white/50 text-black/70'>{usr?.bio}</span>
            </div>

          </div>

          <input type='button' value={user.following?.includes(usr._id)?'unFollow':'Follow'} onClick={e=>{
                dispatch(togglefollowUser(usr._id))
                e.target.value == 'Follow'?e.target.value ='unFollow':e.target.value ='Follow'
          }} className=' cursor-pointer rounded-3xl bg-transparent text-sky-600 border-[2px] border-sky-600 hover:border-sky-700 hover:text-sky-700  px-4 h-8 '/>

        </div>)}



      </div>


      {users != '' && <div className=' w-full flex items-center justify-center' onClick={() => window.scrollTo(0, 0)}>
        <ul className="inline-flex items-center my-5 ">
          <li>
            <button
              onClick={() => nextPage(page - 1)}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
          {
            new Array(docs).fill('').map((e, i) => <li key={Math.random()}>
              <button
                onClick={() => nextPage(i + 1)}

                className={`px-3   ${i + 1 == page ? ' dark:bg-slate-700' : ' '} py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {i + 1}
              </button>
            </li>)
          }


          <li>
            <button
              onClick={() => nextPage(page + 1)}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>}


    </>
  )
}

export default Search