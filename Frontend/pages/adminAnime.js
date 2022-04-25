import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import withAuth from "../components/withAuth";
import useSWR, { mutate } from "swr";
import AdminNav from "../components/adminnav";

const URL = `http://localhost/api/anime`;
const fetcher = (url) => axios.get(url).then((res) => res.data);

const AdminAnime = ({ token }) => {
    const router = useRouter();

    const [anime, setAnime] = useState([]);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
    const [release, setRelease] = useState("");
    const [episode, setEpisode] = useState("");

    const { data, error } = useSWR(URL, fetcher);
    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                Loading...
            </div>
        );
    }

    const addAnime = async (
        name,
        genre,
        author,
        image,
        release,
        episode
    ) => {
        await axios.post(URL, {
            name,
            genre,
            author,
            image,
            release,
            episode
        });
        mutate(URL);
    };

    const getAnime = async (id) => {
        return await axios.get(`${URL}/${id}`).then((res) => {
            if (res.data) {
                setAnime(res.data);
                setName(res.data.name);
                setGenre(res.data.genre);
                setAuthor(res.data.author);
                setImage(res.data.image);
                setRelease(res.data.release);
                setEpisode(res.data.episode);
            }
        });
    };

    const deleteAnime = async (id) => {
        await axios.delete(`${URL}/${id}`);
        mutate(URL);
    };

    const updateAnime = async (id) => {
        await axios.put(`${URL}/${id}`, {
            name,
            genre,
            author,
            image,
            release,
            episode
        });
        mutate(URL);
    };

    return (
        <>
            <Head>
                <title>Admin Management</title>
                <link rel="icon" href="https://i.pinimg.com/736x/39/ec/c5/39ecc58c94b262233d2ea574052acc98.jpg" />
            </Head>
            <AdminNav />
            <div className="w-full min-h-screen h-full bg-white flex justify-center p-5 relative overflow-hidden">
                <div className="max-w-7xl w-full p-1 z-10">

                    <section className="border-4 border-cyan-800 bg-white rounded-lg my-2 w-full h-full">
                        <div className="p-10 grid grid-cols-2 gap-3 w-full max-h-96 h-full">
                            <div>
                                <div className="italic inline-flex w-full items-end mb-2 ">
                                    <p className="w-1/5"> ชื่อ </p>

                                    <input
                                        className="appearance-none bg-transparent border-b border-teal-500  text-black    py-1 px-2 leading-tight focus:outline-none font-light w-96"
                                        type="text"
                                        id="name"
                                        defaultValue={anime.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="italic inline-flex  items-end w-full mb-2 ">
                                    <p className="w-1/5"> ประเภทอนิเมะ </p>

                                    <input
                                        className="appearance-none bg-transparent border-b border-teal-500  text-black  py-1 px-2 leading-tight focus:outline-none  h-full font-light w-96"
                                        type="text"
                                        id="genre"
                                        defaultValue={anime.genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                    />
                                </div>
                                <div className="italic inline-flex w-full items-end mb-2 ">
                                    <p className="w-1/5"> ผู้แต่ง </p>

                                    <input
                                        className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                                        type="text"
                                        id="author"
                                        defaultValue={anime.author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div>
                                <div className="italic inline-flex w-full items-end mb-2 ">
                                    <p className="w-1/5"> ลิงก์รูปภาพ </p>

                                    <input
                                        className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                                        type="text"
                                        id="image"
                                        defaultValue={anime.image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </div>

                                <div className="italic inline-flex w-full items-end mb-2 ">
                                    <p className="w-1/5"> วันที่ฉาย </p>

                                    <input
                                        className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                                        type="text"
                                        id="release"
                                        defaultValue={anime.release}
                                        onChange={(e) => setRelease(e.target.value)}
                                    />
                                </div>

                                <div className="italic inline-flex w-full items-end mb-2 ">
                                    <p className="w-1/5"> จำนวนตอน </p>

                                    <input
                                        className="appearance-none bg-transparent border-b border-teal-500  text-black   py-1 px-2 leading-tight focus:outline-none font-light w-96"
                                        type="text"
                                        id="episode"
                                        defaultValue={anime.episode}
                                        onChange={(e) => setEpisode(e.target.value)}
                                    />
                                </div>

                                <div className="inline-flex w-full justify-center my-2 gap-3">
                                    <button
                                        onClick={() => updateAnime(anime.id)}
                                        className="font-bold bg-amber-600 px-5 py-2 w-36 rounded-md text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            addAnime(
                                                name,
                                                genre,
                                                author,
                                                image,
                                                release,
                                                episode
                                            )
                                        }
                                        className="font-bold bg-lime-800 px-5 py-2 w-36 rounded-md text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="w-full h-full overflow-hidden">
                                <img
                                    src={anime.image}
                                    alt="anime"
                                    className="object-contain w-full h-full object-center"
                                />
                            </div>
                        </div>
                        <div className="p-10">
                            <table className="table-auto w-full border-collapse border-4">
                                <thead>
                                    <tr>
                                        <th className="font-bold border-4 w-1/12">เรื่องที่</th>
                                        <th className="font-bold border-4 w-3/12">ชื่อ</th>
                                        <th className="font-bold border-4 w-2/12">ประเภทอนิเมะ</th>
                                        <th className="font-bold border-4 w-2/12">ผู้แต่ง</th>
                                        <th className="font-bold border-4 w-2/12">วันที่ฉาย</th>
                                        <th className="font-bold border-4 w-2/12">จำนวนตอน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center border-4">{index + 1}</td>
                                            <td className="text-center border-4">
                                                <div className="mt-8">{item.name}</div>
                                                <img
                                                    src={item.image}
                                                    alt="pic"
                                                    className="h-52 object-contain object-center"
                                                />
                                            </td>
                                            <td className="text-center border-4">{item.genre}</td>
                                            <td className="text-center border-4">{item.author}</td>
                                            <td className="text-center border-4">{item.release}</td>
                                            <td className="text-center border-4">{item.episode}</td>
                                            <td className="border-4 ">
                                                <div className="inline-flex justify-center w-full gap-3 m-2">
                                                    <button
                                                        onClick={() => getAnime(item.id)}
                                                        className="bg-amber-600 px-5 py-2 w-24 rounded-md text-white"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => deleteAnime(item.id)}
                                                        className="bg-rose-700 px-5 py-2 w-24 rounded-md text-white"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
                <Footer />
        </>
    );
};

export default withAuth(AdminAnime);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}