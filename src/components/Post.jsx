import axios from 'axios';
import React, { Fragment, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { addcommenttopost, deletePost, toggleLikePost } from '../store/posts/postsSlice';
import Comment from './Comment';


const Post = ({ post }) => {
    const {user } = useSelector(state => state.Auth)
    const [userData, setuserData] = useState();
    const [likes, setlikes] = useState();
    const [liked, setliked] = useState();
    const [comments, setcomments] = useState([]);
    const classNames = (...classes) => classes.filter(Boolean).join(' ')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getUserData = async () => {

        try {
            const res = await axios.get(`/api/user/get-user/${post.userId}`)
            setlikes(post.likes.length)
            post.likes.includes(user._id) ? setliked(true) : setliked(false)
            setcomments(post.comments)
            setuserData(res.data)

        } catch (error) {
            console.log(error)
        }


    }

    useLayoutEffect(() => {
        post && getUserData()

    }, [])


    const likePost = async () => {

        dispatch(toggleLikePost(post))

        if (liked == true) {
            setlikes(likes - 1)

            setliked(false)
        } else {
            setlikes(likes + 1)

            setliked(true)
        }





    }

    const addComment = async (e) => {
        e.preventDefault()
        dispatch(addcommenttopost({ comment: e.target.comment.value, post }))
        e.target.comment.value = ''


    }



    const gotoProfile = (id) => {
        navigate(`/profile/${userData.username}/${userData._id}`)
    }

    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }



    return (<>
        {/* {userData && */}

        <div className="bg-white  dark:bg-slate-800 dark:text-white rounded-lg pb-5  w-[95%] max-w-[35rem] space-y-6 mt-10 mx-auto p-5 ">
            {/* header */}
            <div className="flex space-x-4  justify-between items-center ">
                {/* <div className="flex space-x-4  cursor-pointer items-center " > */}
                    <div className="flex space-x-4  cursor-pointer items-center " onClick={() => gotoProfile()}>
                    <div className="w-12 h-12">
                        <img
                            alt="avatar"
                            src={userData?.profileImage}
                            className="rounded-full w-full h-full object-cover "
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex space-x-2 items-center">
                            <h2 className="text-base"> {userData?.username} </h2>


                        </div>
                        <p className=" text-xs text-slate-400">{timeSince(new Date(post?.createdAt))} ago</p>
                    </div>
                </div>



                {post && user._id == post.userId && <Menu as="div" className="relative inline-block text-left w-fit h-fit self-start">
                    {/* <Menu as="div" className="relative inline-block text-left w-fit h-fit self-start"> */}
                    <div>
                        <Menu.Button >

                            <BsThreeDots size='28' className='p-1 hover:bg-slate-600/20 rounded-md ' />



                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-3 z-10 mt-3 w-44 origin-top-right divide-y divide-gray-100 rounded-md dark:divide-black dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 border-[0.5px] dark:border-black focus:outline-none">

                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <p
                                            onClick={() => { dispatch(deletePost(post)) }}
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                            )}
                                        >
                                            Delete post
                                        </p>
                                    )}
                                </Menu.Item>


                            </div>


                        </Menu.Items>
                    </Transition>
                </Menu>
                }



            </div>
            {/*content*/}
            <div className='  w-full'>

                <p className="text-md leading-6 dark:text-slate-50  text-slate-900">
                    {post?.title}
                </p>

                {post.image &&

                    <div className=' w-full mt-2'>
                        <img
                            alt={post?.title}
                            src={post?.image}
                            className="w-full  object-cover rounded-md"
                        />
                    </div>


                }


            </div>

            <div className="flex justify-between pt-5    relative ">
                <div className=' flex items-center   absolute left-0  cursor-pointer'>
                    <div className='mr-2 active:scale-110' onClick={likePost}>
                        {liked ? <AiFillHeart color='red' size='20' /> : <AiOutlineHeart size='20' />}
                    </div>
                    {likes}

                </div>


                {/* comments*/}
                <Disclosure>
                    <Disclosure.Button className=" absolute right-0">
                        <div className="text-slate-400 text-sm dark:hover:text-white hover:text-black cursor-pointer hover:underline">
                            <p>{comments.length} Comments</p>
                        </div>
                    </Disclosure.Button>

                    <Disclosure.Panel className="pt-8   text-sm text-gray-500  w-full ">
                        <div className=' w-[95%] h-[1px] mb-4 mx-auto bg-slate-500/30 ' />

                        {comments != '' ? <div className=' scroller  h-full w-full  max-h-[200px] overflow-scroll  '>
                            {comments.map(comment => <Comment  key={Math.random()} comment={comment} post={post} />)}

                        </div> : 'no comments'}

                    </Disclosure.Panel>


                </Disclosure>

            </div>
            <form onSubmit={addComment} className=' pt-2 w-full'>
                <div className="relative h-fit flex items-center">
                    <input
                        type="text"
                        name='comment'
                        className="block w-full p-2  text-sm text-gray-900 border border-none rounded-lg bg-gray-50  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white outline-none"
                        placeholder="add comment..."
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-[.1px] scale-[85%]  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>



















    </>

    )
}

export default Post