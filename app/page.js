"use client";
import Link from "next/link";
import CirclePlayer from "../components/CirclePlayer";
import {createContext, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import Image from "next/image";

const MusicContext = createContext();

export default function Home() {
    const [source, setSource] = useState("");
    const audio = useRef(null);
    const [imgUrls, setImgUrls] = useState([]);
    const fetchPics = useRef(false);
    const [showPics, setShowPics] = useState(false);
    const [showMusic, setShowMusic] = useState(false);
    const [picObj, setPicObj] = useState({
        first: "",
        second: "",
        third: ""
    });
    const imgIdx = useRef(0);

    const chooseImg = useCallback((direction) => {
        imgIdx.current += direction === "right" ? 1 : -1;
        let i = imgIdx.current;

        setPicObj({
            first: imgUrls[Math.abs(i%5)],
            second: imgUrls[Math.abs((i+1)%5)],
            third: imgUrls[Math.abs((i+2)%5)]
        })
    }, [imgUrls]);

    const pickSong = useCallback((src, playing, time) => {
        if (src === source) {
            if (playing) {
                audio.current.pause();
            }
            else {
                audio.current.play();
            }
        }
        else {
            audio.current.pause();
            audio.current.src = src;
            audio.current.currentTime = time;
            audio.current.play();
        }
    }, [source])

    const getImage = useCallback((url) => {
        fetch(url).then((res) => {
            res.blob().then((data) => {
                setImgUrls((x) => [...x, URL.createObjectURL(data)])
            })
        })


    }, []);


    useEffect(() => {
        const names = ["/Kaia/Kaia_22.jpg", "/City/City_2.jpg", "/Kodiak/Kodiak_7.jpg", "/Labs/Labs_4.jpg", "/Animals/Animals_6.jpg"];
        if (fetchPics.current) {
            names.forEach(name => getImage("/api" + name));
            fetchPics.current = false;
        }
        else {
            fetchPics.current = true;
        }
        // return () => fetchPics.current = false;
    }, [getImage]);

    useEffect(() => {
        setPicObj({
            first: imgUrls[0],
            second: imgUrls[1],
            third: imgUrls[2]
        })
    }, [imgUrls]);

    useEffect(() => {
        audio.current.volume = 0.1;
    }, []);

    const [songSelect, setSongSelect] = useState(1);

    return (
        <div className={"relative z-10"}>
            <h1 className={"text-6xl lg:text-8xl text-center drop-shadow-2xl shadow-gray-50"}>Tyler Teuber's Multimedia<br/> Portfolio Site</h1>
            <div id={"photography"} className={"relative mt-20"}>
                <Link href={"/photos"} className={"text-6xl drop-shadow-2xl"}>Photography</Link>
                <div className={"relative p-6 h-96 w-full bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-700 my-4 flex justify-center flex items-center"}>
                    <div className={"absolute flex justify-evenly w-full items-center"}>
                        <div className={"absolute inset-0 bg-black opacity-50"}></div>
                        <div className={"h-72 grow text-center flex flex-col justify-center left-0 hover:cursor-pointer z-10"} onClick={() => chooseImg("left")}>
                            <p className={""}>{"<"}</p>
                        </div>
                        <div className={"grow w-80 h-80 lg:h-60 lg:w-60 xl:h-72 xl:w-72 border-4 border-black overflow-hidden bg-black shadow-2xl -z-10 lg:z-10 absolute lg:static"}>
                            <Image src={picObj.first} loading={"lazy"} width={400} height={400} alt={"test"} className={"object-cover object-center h-full"}/>
                        </div>
                        <div className={"grow w-60 h-60 sm:w-80 sm:h-72 lg:h-60 lg:w-60 xl:h-72 xl:w-72 border-4 border-black overflow-hidden bg-black shadow-2xl z-10"}>
                            <Image src={picObj.second} loading={"lazy"} width={400} height={400} alt={"test"} className={"object-cover object-center h-full"}/>
                        </div>
                        <div className={"grow w-80 h-80 lg:h-60 lg:w-60 xl:h-72 xl:w-72 border-4 border-black overflow-hidden bg-black shadow-2xl -z-10 lg:z-10 absolute lg:static"}>
                            <Image src={picObj.third} loading={"lazy"} width={400} height={400} alt={"test"} className={"object-cover object-center h-full"}/>
                        </div>
                        <div className={"h-72 grow text-center flex flex-col justify-center items-center right-0 hover:cursor-pointer z-10"} onClick={() => chooseImg("right")}>
                            <p>{">"}</p>
                        </div>
                    </div>
                    <button className={"absolute bottom-2 left-2 border-2 border-gray-700 text-gray-600 hover:text-gray-400 hover:border-gray-500 rounded-full h-8 w-8 text-center text-xl"} onClick={() => setShowPics(!showPics)}>i</button>
                </div>
            </div>
            <div id={"music"} className={"relative -z-10"}>
                <div className={`relative w-full flex flex-row-reverse transition-all duration-500 ${showPics ? "mt-40 sm:mt-36 md:mt-30 lg:mt-24" : ""}`}>
                    <div className={"w-full bg-gray-900 p-6 text-2xl rounded-2xl absolute bottom-full"}>
                        <p>Photos that I have taken. Mostly of dogs and landscapes.</p>
                    </div>
                    <Link href={"/music"} className={"text-6xl relative drop-shadow-2xl mt-6"}>Music</Link>
                </div>
                <audio src="/audio/Call_Me.mp3" ref={audio} controls={false}></audio>
                <div className={"relative p-6 h-[400px] md:h-[340px] xl:h-[400px] w-full bg-gray-800 flex justify-around rounded-2xl my-4 shadow-2xl border-2 border-gray-700 text-2xl"}>
                    <MusicContext.Provider value={{source, setSource, pickSong, audio}}>
                        <button className={"bg-gray-900 rounded-full border-2 border-gray-600 h-20 w-20 absolute left-5 bottom-1/2 md:fixed md:-z-50 md:w-0 md:border-none"} onClick={() => setSongSelect(songSelect - 1)}>{"<"}</button>
                        <div className={`flex flex-col items-center ${Math.abs(songSelect % 3) !== 0 ? "fixed -z-10" : "absolute"} md:static md:z-10`}>
                            <CirclePlayer width={300} src={"/audio/Call_Me.mp3"} context={MusicContext} time={36}/>
                            <p className={"mt-6"}>Call Me</p>
                        </div>
                        <div className={`flex flex-col items-center ${Math.abs(songSelect % 3) !== 1 ? "fixed -z-10" : "absolute"} md:static md:z-10`}>
                            <CirclePlayer width={300} src={"/audio/Waiting.mp3"} context={MusicContext} time={80}/>
                            <p className={"mt-6"}>Waiting</p>
                        </div>
                        <div className={`flex flex-col items-center ${Math.abs(songSelect % 3) !== 2 ? "fixed -z-10" : "absolute"} md:static md:z-10`}>
                            <CirclePlayer width={300} src={"/audio/Love_Limbo.mp3"} context={MusicContext} time={87.5}/>
                            <p className={"mt-6"}>Love Limbo</p>
                        </div>
                        <button className={"bg-gray-900 rounded-full border-2 border-gray-600 h-20 w-20 absolute right-5 bottom-1/2 md:fixed md:-z-10 md:w-0 md:border-none   "} onClick={() => setSongSelect(songSelect + 1)}>{">"}</button>
                    </MusicContext.Provider>
                    <button className={"absolute bottom-2 left-2 border-2 border-gray-700 text-gray-600 hover:text-gray-400 hover:border-gray-500 rounded-full h-8 w-8 text-center text-xl"} onClick={() => setShowMusic(!showMusic)}>i</button>
                </div>
            </div>
            <div id={"blogs"} className={"relative -z-20"}>
                <div className={`relative w-full flex flex-row-reverse transition-all duration-500 ${showMusic ? "mt-40 sm:mt-36 md:mt-30 lg:mt-24" : ""}`}>
                    <div className={"w-full bg-gray-900 p-6 text-2xl rounded-2xl absolute bottom-full"}>
                        <p>Music that I have personally recorded, mixed, and mastered.</p>
                    </div>
                    <Link href={"/blogs"} className={"text-6xl drop-shadow-2xl mt-6"}>Blogs</Link>
                </div>
                <div className={"p-6 bg-gray-800 rounded-2xl mt-6 h-32 text-4xl shadow-2xl border-2 border-gray-700"}>
                    <p>Personal blogs will be added in the future.</p>
                </div>
            </div>
        </div>
    )
}

