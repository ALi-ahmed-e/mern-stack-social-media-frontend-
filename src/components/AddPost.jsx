import React, { useState } from 'react'
import { MdOutlinePermMedia } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../store/posts/postsSlice'
import {ImSpinner8} from 'react-icons/im'


const AddPost = () => {
    const { user } = useSelector(e => e.Auth)
    const { isLoading } = useSelector(e => e.Posts)
    const [file, setfile] = useState();
    const dispatch = useDispatch()

    const submit = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        if (file) {

           
                dispatch(addPost({ title, image:file }))

            
        } else {
            dispatch(addPost({ title }))
        }



setfile()
        e.target.title.value = ''


    }

    const c64 = (imgFile)=>{
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onloadend = async () => {
            setfile(reader.result)

        }
    }
 


    return (
        <div className='  mt-3 w-full max-w-2xl flex-col  py-4 px-2  bg-white flex  items-center  font-semibold  justify-start  dark:bg-slate-800 dark:text-white   transition-all rounded-md'>

            <form onSubmit={submit} className=' w-full  flex flex-col relative'>
                <div className=' flex'>
                    <img src={user.profileImage} className=' w-10 h-10 rounded-full' alt="" />
                    <div className=" mx-3 w-full">

                        <input
                            name='title'
                            placeholder='Create Post...'
                            type="text"
                            id="large-input"
                            className="block w-full p-2 text-gray-900 border border-gray-300 outline-none rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <label htmlFor="fileInput"><MdOutlinePermMedia size={25} className='absolute cursor-pointer right-5 top-2 hover:text-slate-500 dark:hover:text-slate-300' /></label>
              
              {file&&<img src={file} alt="" className=' w-[95%] mx-auto rounded-md my-3' />}

              {!isLoading?<button className='  mt-5  py-2 w-9/12 mx-auto rounded-md bg-gradient-to-br from-sky-500 to-sky-700 hover:to-sky-500 hover:from-sky-600 '>Post</button>:
              <button className=' flex items-center justify-center  mt-5  py-2 w-9/12 mx-auto rounded-md bg-gradient-to-br  to-sky-500 from-sky-600 ' disabled><ImSpinner8 className='animate-spin' size={25} /></button>
              }
            </form>

            <input type="file" onChange={(e) => c64(e.target.files[0])} className=' hidden ' id='fileInput' />




        </div>
    )
}

export default AddPost