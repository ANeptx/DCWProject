import Link from "next/link";
import Linkto from "next/link";

const navbar = ({ token }) => {

    return (
        <>
            <div className="!z-30 bg-cyan-900 shadow-sm shadow-inherit sticky top-0 min-w-screen w-full h-[50px] flex justify-center px-5">
                <div className="max-w-7xl w-full flex justify-between p-1 items-center ">
                    <div className="w-full flex justify-between">
                        <Link href="/">
                            <a className="rounded-lg text-white font-bold text-lg py-2 px-4 lg:-ml-2 hover:bg-white hover:text-cyan-900"  >Home</a>
                        </Link>

                        <Link href="/allanime">
                            <a className="rounded-lg text-white font-bold text-lg py-2 px-4 lg:-ml-2 hover:bg-white hover:text-cyan-900" >All Anime</a>
                        </Link>

                        <Link href="/source">
                            <a className="rounded-lg text-white font-bold text-lg py-2 px-4 lg:-ml-2 hover:bg-white hover:text-cyan-900" >Source</a>
                        </Link>

                        <Linkto href="/login">
                        <button
                            className="rounded-lg font-bold border-2 border-white text-white px-2 py-1 hover:bg-white hover:text-cyan-900"
                        >
                            Sign in
                        </button>
                        </Linkto>
                    </div>
                </div>
            </div>
        </>
    );
};

export default navbar;

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}