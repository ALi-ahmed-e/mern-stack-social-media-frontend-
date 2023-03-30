import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts, getSomeonePosts } from '../store/posts/postsSlice';
import Post from './Post';

const PostsList = ({ showpage }) => {
    const { posts, page, docs } = useSelector(state => state.Posts)
    const dispatch = useDispatch()


    useEffect(() => {
        if (showpage == 'home') {
            dispatch(getPosts(1))
        } else {
            dispatch(getSomeonePosts({ page: 1, id: showpage }))
        }
    }, [showpage]);




    const nextPage = (pg) => {
        if (showpage == 'home') {
            dispatch(getPosts(pg))
        } else {
            dispatch(getSomeonePosts({ page: pg, id: showpage }))
        }


    }


    return (
        <div className='  w-full'>
            {posts.map(post => <Post post={post} key={Math.random()} />)}

            {posts != ''?<div className=' w-full flex items-center justify-center' onClick={() => window.scrollTo(0, 0)}>
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
                        new Array(docs).fill('').map((e, i) => <li
                            key={Math.random()}>
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
            </div>:<p className=' w-full text-center my-5 font-semibold dark:text-slate-400'>you have no posts</p>}





        </div>
    )
}

export default memo(PostsList)