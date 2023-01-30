"use client";
import Link from "next/link";
import {useState} from "react";

export default function Navbar() {
    const [mobile, setMobile] = useState(false);

    return (
        <div className={"flex flex-row text-gray-400 p-6 text-4xl fixed inset-0 top-0 w-screen z-50 justify-center h-fit"}>
            <div className={"fixed inset-0 bg-gray-700 h-24 w-screen bg-opacity-90 z-40 backdrop-blur-md"}></div>
            <div className={"w-full lg:w-3/4 gap-4 flex flex-row gap-4 -z-50 h-fit fixed sm:static z-0 sm:z-40"}>
                <Link href={"/"} className={"hover:text-gray-300"}>Home</Link>
                <Link href={"/photos"} className={"hover:text-gray-300"}>Photos</Link>
                <Link href={"/music"} className={"hover:text-gray-300"}>Music</Link>
                <Link href={"/about"} className={"hover:text-gray-300"}>About</Link>
            </div>
            <button className={"absolute right-10 z-50 sm:z-0 sm:fixed"} onClick={() => setMobile(!mobile)}>=</button>
            {mobile && <MobileDropDown setMobile={setMobile}/>}
            <h1 className={"z-40 sm:z-0 absolute"}>{mobile || "Tyler Teuber"}</h1>
        </div>
    )
}

function MobileDropDown({setMobile}) {
    return (
        <div className={"fixed inset-0 sm:-left-full bg-gray-700 z-40 sm:-z-50 sm:h-0"}>
            <div className={" p-10 flex flex-col text-8xl sm:h-0 sm:p-0 sm:w-0 sm:-z-10 sm:relative"}>
                <Link href={"/"} className={"hover:text-gray-300"} onClick={() => {setMobile(false)}}>Home</Link>
                <Link href={"/photos"} className={"hover:text-gray-300"} onClick={() => {setMobile(false)}}>Photos</Link>
                <Link href={"/music"} className={"hover:text-gray-300"} onClick={() => {setMobile(false)}}>Music</Link>
                <Link href={"/about"} className={"hover:text-gray-300"} onClick={() => {setMobile(false)}}>About</Link>
            </div>
        </div>
    )
}