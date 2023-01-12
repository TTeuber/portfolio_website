"use client";

import Image from "next/image";

export default function Modal({open, onClose, photo}) {
    return (
        <div className={`absolute inset-0 flex justify-center items-center ${open ? '' : 'pointer-events-none'}`}>
            <div className={`fixed inset-0 bg-black ${open ? 'opacity-50': 'pointer-events-none opacity-0'}`} onClick={onClose}/>
            <p className={"fixed text-8xl"}>hello</p>
            <div className={`fixed lg:bottom-4 top-1/4 lg:top-28 h-auto w-auto shadow-lg backdrop-blur-md p-4 ${open ? '' : 'pointer-events-none opacity-0'}`}>
                <div className={"bg-gray-700 opacity-70 absolute -z-10 inset-0 h-auto w-auto"}/>
                <div>
                    <button onClick={onClose} className={"bg-gray-500 p-2 rounded-full w-8 h-8 flex justify-center text-white items-center mb-4"}>X</button>
                </div>
                <Image src={photo} alt="photo" height={400} width={400} className={"lg:h-5/6 w-auto opacity-100"}/>
            </div>
        </div>
    )
}