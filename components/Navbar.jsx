import Link from "next/link";

export default function Navbar() {
    return (
        <div className={"flex flex-row text-gray-400 p-6 text-4xl fixed inset-0 top-0 w-screen z-30 justify-center h-fit"}>
            <div className={"fixed inset-0 bg-gray-700 h-24 w-screen bg-opacity-90 z-40 backdrop-blur-md"}></div>
            <div className={"w-3/4 gap-4 flex flex-row gap-4 z-50 h-fit"}>
                <Link href={"/"} className={"hover:text-gray-300"}>Home</Link>
                <Link href={"/photos"} className={"hover:text-gray-300"}>Photos</Link>
                <Link href={"/music"} className={"hover:text-gray-300"}>Music</Link>
                <Link href={"/blogs"} className={"hover:text-gray-300"}>Blogs</Link>
            </div>
        </div>
    )
}