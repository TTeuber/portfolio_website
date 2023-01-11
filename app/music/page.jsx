"use client";
import {createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import Image from "next/image";
import playBtnImg from "../../public/icons/play.png";
import pauseBtnImg from "../../public/icons/pause.png";

const SongContext = createContext();

export default function Music() {
    const audio = useRef("");
    const [songNames, setSongNames] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState("");

    useEffect(() => {
        fetch("/api/songNames").then((res) => {
            res.json().then((data) => setSongNames(data.names))
        })
    }, []);

    useEffect(() => {
        audio.current.addEventListener("timeupdate", chase);
    }, [audio.current.currentTime])

    function chase() {
        const target = document.getElementById("seekSlider");
        target.style.backgroundSize = (audio.current.currentTime/audio.current.duration) * 100 + '% + 100%';
    }

    return (
        <div>
            <h1 className={"text-6xl lg:text-8xl text-center mb-20"}>Songs</h1>
            <SongContext.Provider value={{audio, playing, setPlaying, currentSong, setCurrentSong}}>
                <div className={"border-2 border-gray-700 p-6 rounded-2xl bg-gray-800"}>
                    <div className={"flex flex-col gap-4"}>
                        {songNames.map((n, i) => {
                            return <SongPicker songName={`/audio/${n}`} key={i}/>
                        })}
                    </div>
                </div>
                <div className={"fixed w-screen flex justify-center bottom-0 left-0 z-40"}>
                    <AudioPlayer/>
                </div>
            </SongContext.Provider>
        </div>
    );
}

function SongPicker({songName}) {
    const {audio, playing, setPlaying, currentSong, setCurrentSong} = useContext(SongContext);
    const [duration, setDuration] = useState("0");
    const [songDurations] = useState({
        "Call_Me.mp3": "2:15",
        "Waiting.mp3": "3:39",
        "Love_Limbo.mp3": "4:10"
    })
    function changeSong() {
        if (currentSong !== songName) {
            audio.current.pause();
            audio.current.src = songName;
            setCurrentSong(songName)
            audio.current.play();
            if (!playing) {
                setPlaying(true);
            }
        } else if (playing === true) {
            audio.current.pause();
            setPlaying(false)
        } else {
            audio.current.play();
            setPlaying(true);
        }
    }

    function checkPlaying() {
        if (currentSong === songName && playing === true) {
            return (
                <Image src={"/icons/pause.png"} alt={"pause"} width={100} height={100} className={"w-6"}/>
            )
        } else {
            return (
                <Image src={"/icons/play.png"} alt={"play"} width={100} height={100} className={"w-6"}/>
            )
        }
    }

    return (
        <div id={`songPicker_${songName}`} className={"z-40 hover:cursor-pointer flex text-2xl"} onClick={() => {changeSong()}}>
            <p className={"border-r p-4 w-20 flex items-center"}>{checkPlaying()}</p>
            <div className={"flex items-center flex-grow"}>
                <p className={"p-4"}>{songName.split("/")[2].split(".")[0].replace("_", " ")}</p>
            </div>
            <div className={"flex items-center"}>
                <p>{songDurations[songName.split("/")[2]]}</p>
            </div>
        </div>
    )
}

function AudioPlayer() {
    const {audio, playing, setPlaying, currentSong} = useContext(SongContext);
    const seekSlider = useRef();
    const volumeSlider = useRef();
    const [time, setTime] = useState("0:00");
    const [duration, setDuration] = useState("");
    const [listening, setListening] = useState(true);

    const thumbPosition = useCallback(() => {
        let val = ((seekSlider.current.value / 1000) - 0.5) * 12;
        val = val.toFixed(2);
        document.styleSheets[0].cssRules[6].style.left = val + 'px';
    }, [seekSlider])

    const getTime = useCallback(() => {
        let minutes;
        let seconds;
        if (listening) {
            minutes = Math.floor(audio.current.currentTime / 60);
            seconds = (((audio.current.currentTime / 60) - minutes) * 60 / 100).toFixed(2).split(".")[1];
        } else {
            const current = seekSlider.current.value / 1000 * audio.current.duration;
            minutes = Math.floor(current / 60);
            seconds = (((current / 60) - minutes) * 60 / 100).toFixed(2).split(".")[1];
        }
        if (seconds === "60") {
            seconds = "00";
            minutes = minutes + 1;
        }
        setTime(`${minutes}:${seconds}`);
            if (time === duration && time !== "0:00") {
                setPlaying(false)
            }
       }, [audio, duration, listening, setPlaying, time])

    useLayoutEffect(() => {
        let minutes = Math.floor(audio.current.duration / 60);
        let seconds = (((audio.current.duration / 60) - minutes) * 60 / 100).toFixed(2).split(".")[1];
        if (isNaN(minutes)) {
            minutes = "0"
        }
        if (seconds === undefined) {
            seconds = "00"
        }
        if (seconds === "60") {
            seconds = "00";
            minutes = minutes + 1;
        }
        setDuration(`${minutes}:${seconds}`);

    }, [audio, time])

    const timeListener = useCallback(() => {
        if (audio.current !== null) {
            if (listening) {
                seekSlider.current.value = (audio.current.currentTime / audio.current.duration) * 1000;
                sliderBackground();
                getTime();
            }
        }
    }, [audio, getTime, listening])

    function sliderBackground() {
        const target = seekSlider.current;
        const min = target.min;
        const max = target.max;
        const val = target.value;

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    }

    return (
        <div className={"relative bg-gray-700 p-6 w-full flex justify-center"}>
            <div className={"w-full lg:w-3/4 flex flex-row gap-4"}>
                <audio src={""} id={"song"} ref={audio} onTimeUpdate={() => {timeListener(); thumbPosition()}}/>
                <div className={"w-20 text-center h-8"}>
                    <button
                        id={"playButton"}
                        disabled={currentSong === ""}
                        className={`absolute bottom-7 ${(currentSong === "") ? "text-gray-600" : "hover:text-gray-300"}`}
                        onClick={() => {playing ? audio.current.pause() : audio.current.play(); setPlaying(!playing);}}
                    >
                        <Image src={playing ? pauseBtnImg : playBtnImg} alt={"play button"} height={100} width={100} className={"w-4"}/>
                    </button>
                </div>
                <div className={"w-full relative bottom-1"}>
                    <div className={`absolute w-full h-full ${duration === "0:00" ? "z-10" : "-z-10"}`}/>
                    <div className={"relative w-full group z-0"}>
                        <input
                            type="range"
                            min={"0"}
                            max={"1000"}
                            defaultValue={"0"}
                            id={"seekSlider"}
                            ref={seekSlider}
                            step={"1"}
                            className={"w-full"}
                            disabled={duration === "0:00"}
                            onChange={() => {
                                setListening(false);
                                sliderBackground();
                                thumbPosition();
                                getTime();
                            }}
                            onMouseUp={() => {
                                audio.current.currentTime = (seekSlider.current.value / 1000) * audio.current.duration;
                                setListening(true);}}
                        />
                    </div>
                </div>
                <div className={"w-40 text-center"}>
                    <p>{`${time}/${duration}`}</p>
                </div>
                <label htmlFor={"volumeSlider"} className={"fixed -z-10 md:static md:z-0"}>Volume</label>
                <input
                    className={"fixed -z-10 md:static md:z-0 w-0 md:w-36"}
                    type="range"
                    min={"0"}
                    max={"100"}
                    ref={volumeSlider}
                    defaultValue={"100"}
                    id={"volumeSlider"}
                    step={"1"}
                    onChange={() => {
                        audio.current.volume = ((100 ** (volumeSlider.current.value/100)) / 100);
                        const target = volumeSlider.current;
                        target.style.backgroundSize = (target.value - target.min) * 100 / (target.max - target.min)
                            + (2 - ((target.value / target.max) * 3)) + '% 100%';
                    }}
                />
            </div>
        </div>
    )
}
