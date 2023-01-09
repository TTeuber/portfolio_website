"use client";

import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Modal from "../../../components/Modal";

export default function Page({params}) {
    const [open, setOpen] = useState(false);
    const [picture, setPicture] = useState("");
    const [pics, setPic] = useState([]);

    const getImage = useCallback((url) => {
        fetch(url).then((res) => {
            res.blob().then((data) => {
                setPic((x) => [...x, URL.createObjectURL(data)])
            })
        })
    }, []);

    useEffect(() => {
        fetch(`/api/photoNames/${params.album}`).then((res) => {
            res.json().then((nameData) => {
                nameData.names.forEach((name) => {
                    getImage(`/api/${params.album}/${name}`)
                })
            });
        });
    }, [getImage, params.album])

    function toggleModal() {
        setOpen(!open);
    }

    function openPhoto(pic) {
        setPicture(pic);
        setOpen(!open);
    }

    return (
        <div>
            <h1 className={"text-6xl lg:text-8xl text-center mb-20"}>{params.album.replace("%20", " ")}</h1>
            <div className={"grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 auto-rows-auto justify-items-center gap-y-8 hover:cursor-pointer"}>
                {pics.map((pic, i) => {
                    return (
                        <div key={i} className={"h-80 w-80 md:h-60 md:w-60 lg:h-[21rem] lg:w-[21rem] 2xl:h-80 2xl:w-80 border-4 border-gray-700 rounded-2xl overflow-hidden bg-gray-800 shadow-2xl"}>
                            <Image src={pic} loading={"lazy"} width={400} height={400} alt={"test"} onClick={() => openPhoto(pic)} className={"object-contain object-center h-full"}/>
                        </div>)
                })}
            </div>
            {open && <Modal open={open} photo={picture} onClose={() => toggleModal()}/>}
        </div>
    )
}
