import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { RadioGroup } from '@headlessui/react'
import { MdRadioButtonChecked } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { setTheme } from '../store/theme/themeSlice'
import { checkLoggedIn, setUser } from '../store/auth/authSlice'


const Settings = () => {
    const userdata = useSelector(state => state.Auth.user)
    const [user, setuserData] = useState();
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state.theme)
    const [load, setload] = useState(false);
    const [profileImage, setprofileImage] = useState(null);
    const [vst, setvst] = useState();
    const [vrfd, setvrfd] = useState(false);

    const ct64 = (file) => {
        setload(true)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            setload(false)
            setprofileImage(reader.result);
        }
        reader.onerror = function (error) {
            setload(false)
            console.log('Error: ', error);
        };

    }

    const getUserData = async () => {
        if (userdata) {
            try {
                const res = await axios.get(`/api/user/get-user/${userdata._id}`, { withCredentials: true })
                setuserData(res.data)
            } catch (error) {
                console.log(error)
            }

        }
    }

    useLayoutEffect(() => {
        getUserData()
    }, [])

    const saveChanges = async (e) => {
        e.preventDefault()


        if (user) {
            setload(true)

            const data = profileImage ? {
                username: e.target.username.value,
                profileImage: profileImage,
                bio: e.target.bio.value,
            } : {
                username: e.target.username.value,
                bio: e.target.bio.value,
            }


            try {
                const res = await axios.put(`/api/user/update-user`, data, { withCredentials: true })
                console.log(res.data)
                dispatch(setUser(res.data))
                setload(false)
            } catch (error) {
                console.log(error)
                setload(false)
            }
        }
    }

    const sendVerfEmail = async () => {
        const res = await axios.post('/api/verfiyemail', { email: user.email }, { withCredentials: true })
        setvst('Otp Code sent to your email')
    }

    const VerfEmail = async (e) => {
        e.preventDefault()
        const otp = [e.target.d1.value,e.target.d2.value,e.target.d3.value,e.target.d4.value].join('')
        
        const res = await axios.post('/api/verfiyemailotp', { email: user.email,otp }, { withCredentials: true })

        
        if(res.data.message == 'account verfied successfuly'){
            setvrfd(true)
            setTimeout(() => {
                dispatch(checkLoggedIn())
            }, 3000);
        }
    }



    return (
        <div className=' min-h-screen pb-1'>

            <div className=' flex relative items-center  flex-col h-fit  bg-white dark:bg-[#0b1120]  w-[97%] sm:w-[90%] max-w-7xl  mx-auto rounded-lg  mt-20'>





                <div className=' flex items-center justify-center'>{user ? <>
                    <img src={profileImage ? profileImage : user.profileImage} className=' h-32   w-32 self-center  rounded-full -mt-16  ' alt="user image" />
                    <label htmlFor="myfile" className=' h-[130px] bg-black/60 b w-[130px] opacity-0 hover:opacity-100 transition-all flex items-center justify-center cursor-pointer self-center  backdrop-blur-[2px] absolute rounded-full -mt-16  ' ><FaEdit size='30' /></label>
                    <input onChange={(e) => { ct64(e.target.files[0]) }} type="file" id="myfile" name="myfile" className=' hidden' accept='.jpeg,.png,.jpg' />

                </> : <div className=' h-32   w-32 self-center bg-slate-200 dark:bg-slate-700 animate-pulse  rounded-full -mt-16  ' alt="user image" />}</div>






                <form onSubmit={saveChanges} className=' w-[95%] max-w-xl mt-12 flex  flex-col'>

                    <div className=' my-5'>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <input
                            defaultValue={user?.username}
                            type="text"
                            id="name"
                            name='username'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="your name"
                        />
                    </div>

                    <div className=' my-5'>
                        <label
                            htmlFor="bio"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Bio
                        </label>
                        <input
                            defaultValue={user?.bio}
                            type="text"
                            id="bio"
                            name='bio'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Bio"
                        />
                    </div>



                    <button className={` w-[90%] py-2 rounded-md self-center bg-green-600 hover:bg-green-700 ${load && ' opacity-60 '} text-white my-14`} disabled={load && true} >Save</button>
                </form>




            </div>

            <div className=' flex relative items-center  flex-col h-fit  bg-white dark:bg-[#0b1120] p-5  w-[97%] sm:w-[90%] max-w-7xl  mx-auto rounded-lg  my-20'>
                <span className='  font-bold  text-3xl dark:text-white tracking-[2px]  mb-5'>Apperance</span>
                <RadioGroup className=' w-full max-w-sm' defaultValue={theme} onChange={(e) => {
                    dispatch(setTheme(e))
                    localStorage.setItem('theme', e)
                }}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="space-y-2">

                        <RadioGroup.Option
                            value={'light'}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'dark:bg-slate-700 dark:text-white   bg-white'
                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium`}
                                                >
                                                    light
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline}`}
                                                >
                                                    light mode
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-white">
                                                <MdRadioButtonChecked size='24' color='white' />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>


                        <RadioGroup.Option
                            value={'dark'}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'dark:bg-slate-700 dark:text-white   bg-white'
                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium`}
                                                >
                                                    dark
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline}`}
                                                >
                                                    dark mode
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-white">
                                                <MdRadioButtonChecked size='24' color='white' />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>

                    </div>
                </RadioGroup>
            </div>

            {user?.verfied == false && <div className=' flex relative items-center dark:text-white  flex-col h-fit  bg-white dark:bg-[#0b1120] p-5  w-[97%] sm:w-[90%] max-w-7xl  mx-auto rounded-lg  my-20'>
                {vst ? <>{!vrfd?<>
                
                    {vst}
                    <form onSubmit={(e)=>VerfEmail(e)} className="flex flex-col items-center justify-between mx-auto w-full max-w-xs my-5">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs my-5">

                            <input
                                className="w-10 h-10 dark:text-white  flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 dark:border-slate-800 dark:bg-slate-700 focus:ring-1 ring-blue-700"
                                type="text"
                                name="d1"
                                maxLength='1'
                                required
                            />

                            <input
                                className="w-10 h-10 dark:text-white  flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 dark:border-slate-800 dark:bg-slate-700 focus:ring-1 ring-blue-700"
                                type="text"
                                name="d2"
                                maxLength='1'
                                required
                            />


                            <input
                                className="w-10 h-10 dark:text-white  flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 dark:border-slate-800 dark:bg-slate-700 focus:ring-1 ring-blue-700"
                                type="text"
                                name="d3"
                                maxLength='1'
                                required
                            />


                            <input
                                className="w-10 h-10 dark:text-white  flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 dark:border-slate-800 dark:bg-slate-700 focus:ring-1 ring-blue-700"
                                type="text"
                                name="d4"
                                maxLength='1'
                                required
                            />

                        </div>
                        <button  className={` w-[90%] max-w-xs py-2 rounded-md self-center bg-indigo-600 hover:bg-indigo-700 text-white my-5`} >Verfiy</button>


                    </form>
                </>:<><span className='  font-bold  text-3xl dark:text-white tracking-[2px] block mb-5'>Your account successfuly  verfied </span>
                    <span className=' dark:text-slate-500 '>page is automatically reloading in 3 seconds</span></>}
                </> : <>
                    <span className='  font-bold  text-3xl dark:text-white tracking-[2px]  mb-5'>Your account is not verfied </span>
                    <span className=' dark:text-slate-500 '>Please verfiy your account to have better experience</span>

                    <button onClick={sendVerfEmail} className={` w-[90%] max-w-xs py-2 rounded-md self-center bg-indigo-600 hover:bg-indigo-700 text-white my-5`} >Verfiy</button>
                </>}








            </div>}

        </div>




    )
}

export default Settings