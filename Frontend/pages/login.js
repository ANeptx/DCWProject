import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";


const URL = `http://localhost/api/login`
const Login = ({ token }) => {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [ischeck, setIscheck] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(URL,
                { username, password, ischeck },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            console.log('Message: ', result.data.message);
            setStatus('Login successfully')
            router.push("/adminAnime");
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(20, 46))
        }
    }

    const loginForm = () => (
        <div className='flex flex-col w-4/5 -mt-2'>
            <div>
                Username:
            </div>
            <div>
                <input className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='mt-4'>
                Password:
            </div>
            <div>
                <input className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
    )

    return (
        <>
            <Head>
                <title>Log in</title>
                <link rel="icon" href="https://i.pinimg.com/736x/39/ec/c5/39ecc58c94b262233d2ea574052acc98.jpg" />
            </Head>

            <div className="w-full min-h-screen h-full bg-cyan-900 flex justify-center p-5 relative">
                <div className="max-w-7xl w-full p-1 z-10">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="font-bold text-2xl text-white inline-flex items-center justify-center"
                        >
                            <svg
                                className="w-4 h-7 mr-2 -ml-1 rotate-180"
                                viewBox="0 0 256 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                                />
                            </svg>
                            BACK
                        </button>
                    </div>

                    <div className="w-full flex justify-center items-center h-full">
                        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 outline">
                            <div className="w-full flex justify-center flex-col items-center">
                                <h1 className="text-4xl font-bold text-center mb-4">
                                    User Login
                                </h1>
                                <span className="mb-4 italic">
                                    Status : <span className="text-green-600">{status}</span>
                                </span>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <input
                                className="h-4 w-4 mt-5"
                                type="checkbox"
                                name="IsRememberMe"
                                onChange={(e) => setIscheck(e.target.value)}
                            />{" "}
                            <span className="ml-1 text-base">Remember me</span>
                            <div className="text-center mt-6">
                                <button
                                    onClick={login}
                                    className="py-3 w-64 text-xl text-white bg-orange-400 rounded-2xl"
                                >
                                    Login
                                </button>
                                <p className="mt-5 text-sm">
                                    Don't have an account?{" "}
                                    <Link href="/register">
                                        <span className="underline text-blue-700 cursor-pointer">Sign up</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )




}
export default Login

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}