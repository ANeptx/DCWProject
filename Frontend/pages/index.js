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
      <main>
        <Navbar />
        <div className="relative max-h-screen min-w-full w-full h-full bg-[url('https://images7.alphacoders.com/120/thumb-1920-1206753.png')] bg-cover bg-no-repeat bg-center" >

        </div>
        <Footer />
      </main>
    </>
  )
}
