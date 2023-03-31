import {Fragment, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../store/auth/authSlice'
import { FaBars, FaSearch } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import { searchUsers } from '../store/search/SearchSlice'

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(e => e.Auth)
    const classNames = (...classes) => classes.filter(Boolean).join(' ')
    const [show, setshow] = useState(false);
    const logout = ()=>{
        dispatch(logOut())
    }
    const navigate = useNavigate()


    return (
        <nav className="dark:bg-gray-800 bg-white transition-all z-50">
            {/* <nav className="dark:bg-gray-800 bg-white transition-all fixed top-0 left-0 right-0 z-50"> */}
            <div className="mx-auto transition-all max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex  transition-all h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => { setshow(!show) }}
                        >
                            <FaBars size='25' />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to="/" className='  font-extrabold lett text-2xl dark:text-white tracking-[2px] '>Social</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">

                                <form 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    dispatch(searchUsers({page:1,query:e.target.query.value}))
                                }}
                                
                                className=' w-[400px]' onFocus={() => navigate('/search')}>
                                    <div className="relative flex items-center justify-end">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                            <FaSearch size='25' className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <input
                                            name='query'
                                            type="search"
                                            id="default-search"
                                            className="block w-full p-3 pl-10 text-sm text-gray-900 border-none rounded-lg bg-gray-50 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white outline-none"
                                            placeholder="Search..."
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="text-white absolute   mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* Profile dropdown */}
                        <div className="relative ml-3 flex ">

                            {/* <div onClick={toggle} className=' p-1 hover:p-1 hover:bg-slate-900/60 cursor-pointer rounded-md self-center  mr-2 sm:mr-10'><FaPlus size='25' /></div> */}
                            <Menu as="div" className="relative inline-block text-left w-fit h-fit">
                                <div>
                                    <Menu.Button className='flex items-center focus:outline-none'>

                                        <img
                                            className="h-10 w-10 rounded-full ring-2 active:ring-sky-600"
                                            src={user.profileImage}
                                            alt="user image "
                                        />



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
                                                        onClick={() => {
                                                            navigate(`/profile/${user.username}/${user._id}`)
                                                        }}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                                        )}
                                                    >
                                                        profile
                                                    </p>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <p
                                                        onClick={logout}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-gray-900 dark:text-slate-100 text-gray-900  cursor-pointer flex justify-between' : 'text-gray-700 dark:text-slate-100 cursor-pointer flex justify-between', 'block px-4 py-2 text-sm  cursor-pointer'
                                                        )}
                                                    >
                                                        logout
                                                    </p>
                                                )}
                                            </Menu.Item>

                                        </div>


                                    </Menu.Items>
                                </Transition>
                            </Menu>

                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu, show/hide based on menu state. */}
            <div className={`sm:hidden overflow-hidden ${show ? 'h-fit' : 'h-0'} transition-all `} id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3 text-center  transition-all">
                    <Link
                        to="/"
                        className="hover:bg-gray-900/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        aria-current="page"
                    >
                        Home
                    </Link>
                    <Link
                        to="/settings"
                        className="hover:bg-gray-900/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        aria-current="page"
                    >
                        settings
                    </Link>
                    <Link
                        to={`/profile/${user.username}/${user._id}`}
                        className="hover:bg-gray-900/50 text-white block rounded-md px-3 py-2 text-base font-medium"
                        aria-current="page"
                    >
                        Profile
                    </Link>
                    
                    <form 
                     onSubmit={(e) => {
                        e.preventDefault()
                        dispatch(searchUsers({page:1,query:e.target.query.value}))
                    }}
                    className=' max-w-[400px] mx-auto' onFocus={() => navigate('/search')}>
                        <div className="relative flex items-center justify-end">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                                <FaSearch size='25' className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                name='query'
                                type="search"
                                id="default"
                                className="block w-full p-3 pl-10 text-sm text-gray-900 border-none rounded-lg bg-gray-50 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white outline-none"
                                placeholder="Search..."
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute   mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </nav>
    )
}

export default Header