import { useRouter } from "next/router";
import axios from "axios";

const AdminNav = ({ token }) => {
    const router = useRouter();

    const logout = async () => {
        console.log("remove token: ", token);
        let result = await axios.get(`http://localhost/api/logout`, {
            withCredentials: true,
        });
        console.log("Logout successfully");
        router.push("/");
    };

    return (
        <>
            <div className="!z-30 bg-cyan-900 shadow-sm shadow-inherit sticky top-0 min-w-screen w-full h-[50px] flex justify-center px-5">
                <div className="max-w-7xl w-full flex justify-between p-1 items-center ">
                    <div className="w-full flex justify-between">
                        <button
                            onClick={() => router.push("/")}
                            className="bg-transparent font-bold text-white inline-flex items-center justify-center"
                        >
                            <svg
                                className="w-5 h-5 mr-2 -ml-1 rotate-180"
                                viewBox="0 0 256 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                                />
                            </svg>
                            HOME
                        </button>
                        <div className="text-white flex items-center">
                        <p className="text-white font-bold text-2xl">Anime Management</p>
                        </div>
                        <button
                            onClick={logout}
                            className="rounded-lg font-bold border-2 border-white text-white px-2 py-1 hover:bg-white hover:text-cyan-900"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNav;

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}