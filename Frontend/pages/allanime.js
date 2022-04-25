import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const URL = `http://localhost/api/anime`;

const Allanime = () => {
    const router = useRouter();
    const [anime, setAnime] = useState([]);

    useEffect(() => {
        getAnime();
    }, []);

    const getAnime = async () => {
        return await axios.get(`${URL}`).then((res) => {
            if (res.data) {
                setAnime(res.data);
            }
        });
    };

    return (
        <>
            <Head>
                <title>All Anime</title>
                <link rel="icon" href="https://i.pinimg.com/736x/39/ec/c5/39ecc58c94b262233d2ea574052acc98.jpg" />
            </Head>
            <main>
                <Navbar />
                <div className="w-full min-h-screen h-full flex justify-center p-5 relative overflow-hidden">
                        <div  className="max-w-7xl w-full p-1 z-10">
                            <section className="w-full flex flex-col justify-center items-center gap-5 p-3">
                            {anime.map((item, index) => (
                                <div key={index} className="text-cyan-900 min-h-[300px] h-full w-full border-2 border-black max-w-5xl hover:bg-cyan-900 hover:text-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                                        <div className="w-full h-full p-5 flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt="spyxfamily"
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="w-full h-full p-5 gap-2 flex flex-col justify-center">
                                            <p className="text-xl">{item.name}</p>
                                            <p className="text-base">
                                                แนว: {item.genre}
                                            </p>
                                            <p className="text-sm">
                                                ผู้แต่ง: {item.author}
                                            </p>
                                            <p className="text-sm">วันที่ฉาย: {item.release}</p>
                                            <p className="text-sm">จำนวนตอน: {item.episode} ตอน</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </section>
                        </div>
                </div>
                <Footer />
            </main>
        </>
    );
};

export default Allanime;
