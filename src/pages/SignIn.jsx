import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess, signIn } from '../store/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const SignIn = () => {
    const dispatch = useDispatch()
    const { error } = useSelector(e => e.Auth)


    const signInf = async (e) => {
        e.preventDefault()
        dispatch(signIn({
            email: e.target.email.value,
            password: e.target.password.value
        }))

    }


    return (

        <section className="  w-full min-h-screen flex items-center justify-center">

            <div className="w-full  max-w-md bg-white rounded-lg shadow dark:border    dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => { signInf(e) }}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-100 border-none outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder="name@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-100 border-none outline-none  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                required
                            />
                        </div>
                        <span className=' text-red-600 mx-auto mt-2'>{error.src == 'login'&&error.err}</span>
                        <button
                            type="submit"
                            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </section>


    )
}

export default SignIn