import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";


export default function Home() {


  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="https://i.pinimg.com/736x/39/ec/c5/39ecc58c94b262233d2ea574052acc98.jpg" />
      </Head>
      <Navbar />
      <div className="min-h-screen h-full bg-[url('https://images7.alphacoders.com/120/thumb-1920-1206753.png')] bg-cover bg-no-repeat bg-center" >
        <div className='flex flex-col justify-center items-center text-white font-bold animate-bounce'>
            <h1 className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-72 text-6xl uppercase tracking-wider'>Welcome to My Anime</h1>
        </div>
      </div>
      <Footer />
    </>
  )
}
