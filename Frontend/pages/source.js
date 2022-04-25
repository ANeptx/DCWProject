import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

const Source = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Source</title>
                <link rel="icon" href="https://i.pinimg.com/736x/39/ec/c5/39ecc58c94b262233d2ea574052acc98.jpg" />
            </Head>
            <main>
                <Navbar />
                <div className="w-full min-h-screen h-full flex justify-center p-5 relative overflow-hidden">
                    <div className="max-w-7xl w-full p-1 z-10">
                        <section className="w-full flex flex-col justify-center items-center gap-5 p-3">
                            <div className="text-white bg-cyan-900 min-h-[300px] h-full w-full border-2 border-black max-w-5xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                    <div className="w-full h-full p-5 flex items-center justify-center">
                                        <img
                                            src="https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png"
                                            alt="NF"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                                        <p className="text-3xl text-center font-bold">NETFLIX</p>
                                        <Link href="https://www.netflix.com/">
                                        <button className="rounded-lg font-bold border-4 border-red-800 bg-red-800 text-white px-2 py-1 hover:bg-white hover:text-red-800">
                                            ดูที่นี่!
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="text-white bg-cyan-900 min-h-[300px] h-full w-full border-2 border-black max-w-5xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                    <div className="w-full h-full p-5 flex items-center justify-center">
                                        <img
                                            src="https://yt3.ggpht.com/nJyRmx3Vk09_Ytq_bTbt7PhM4RA3BGSbPtFpxJQkKkjK7iEnmNSBrt1o5iRHP_QkAaSJ_rYjvA=s900-c-k-c0x00ffffff-no-rj"
                                            alt="Muse"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                                        <p className="text-3xl text-center font-bold">Muse Thailand</p>
                                        <Link href="https://www.youtube.com/channel/UCn8hjQOnGYR1AZtYYMYP5jQ">
                                        <button className="rounded-lg font-bold border-4 border-red-800 bg-red-800 text-white px-2 py-1 hover:bg-white hover:text-red-800">
                                            ดูที่นี่!
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="text-white bg-cyan-900 min-h-[300px] h-full w-full border-2 border-black max-w-5xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                    <div className="w-full h-full p-5 flex items-center justify-center">
                                        <img
                                            src="https://inceptum-stor.icons8.com/BsoX2eN2vaIj/unnamed.jpg"
                                            alt="Bilibili"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                                        <p className="text-3xl text-center font-bold">Bilibili</p>
                                        <Link href="https://www.bilibili.tv/th/index?season_type=1,4">
                                        <button className="rounded-lg font-bold border-4 border-red-800 bg-red-800 text-white px-2 py-1 hover:bg-white hover:text-red-800">
                                            ดูที่นี่!
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="text-white bg-cyan-900 min-h-[300px] h-full w-full border-2 border-black max-w-5xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                    <div className="w-full h-full p-5 flex items-center justify-center">
                                        <img
                                            src="https://img.icons8.com/color/480/iqiyi.png"
                                            alt="Iqiyi"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                                        <p className="text-3xl text-center font-bold">iQiYi</p>
                                        <Link href="https://www.iq.com/anime?lang=th_th">
                                        <button className="rounded-lg font-bold border-4 border-red-800 bg-red-800 text-white px-2 py-1 hover:bg-white hover:text-red-800">
                                            ดูที่นี่!
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="text-white bg-cyan-900 min-h-[300px] h-full w-full border-2 border-black max-w-5xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                    <div className="w-full h-full p-5 flex items-center justify-center">
                                        <img
                                            src="https://software.thaiware.com/upload_misc/software/2016_05/728/8186_1605131039394b.png"
                                            alt="Ais"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                                        <p className="text-3xl text-center font-bold">AIS Play</p>
                                        <Link href="https://aisplay.ais.co.th/portal/screen/animeSTB/">
                                        <button className="rounded-lg font-bold border-4 border-red-800 bg-red-800 text-white px-2 py-1 hover:bg-white hover:text-red-800">
                                            ดูที่นี่!
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
                <Footer />
            </main >
        </>
    );
};

export default Source;
