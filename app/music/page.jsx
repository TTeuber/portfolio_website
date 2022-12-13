"use client";
import {createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";

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
        sliderHelper();
    }, []);

    useEffect(() => {
        audio.current.addEventListener("timeupdate", chase);
    }, [audio.current.currentTime])

    function chase() {
        const target = document.getElementById("seekSlider");
        const min = target.min
        const max = target.max
        const val = target.value

        // target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
        target.style.backgroundSize = (audio.current.currentTime/audio.current.duration) * 100 + '% + 100%';
    }



    return (
        <div className={""}>
            <SongContext.Provider value={{audio, playing, setPlaying, currentSong, setCurrentSong}}>
                <div className={"flex flex-col gap-4"}>
                    {songNames.map((n, i) => {
                        return <SongPicker songName={`/audio/${n}`} key={i}/>
                    })}
                </div>
                <div className={"fixed w-screen flex justify-center bottom-0 left-0"}>
                    <AudioPlayer/>
                </div>
            </SongContext.Provider>
        </div>
    );
}

function SongPicker({songName}) {
    const {audio, playing, setPlaying, currentSong, setCurrentSong} = useContext(SongContext);

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

    function checkSelected() {
        if (currentSong === songName) {
            const picker = document.getElementById(`songPicker_${songName}`);
            if (picker !== null) {
                picker.classList.replace("border", "border-4");
            }
            return "selected";
        } else {
            const picker = document.getElementById(`songPicker_${songName}`);
            if (picker !== null) {
                picker.classList.replace("border-4", "border");
            }
            return "select";
        }
    }

    function checkPlaying() {
        if (currentSong === songName && playing === true) {
            return "playing";
        } else {
            return "play";
        }
    }

    return (
        <div id={`songPicker_${songName}`} className={"border p-6 z-50 hover:cursor-pointer"} onClick={() => {changeSong()}}>
            <p>{songName}</p>
            <p>{checkPlaying()}</p>
            <p>{playing ? 1 : 2}</p>
            {(currentSong === songName) && <AudioSlider/>}
        </div>
    )
}

function AudioSlider() {
    const {audio} = useContext(SongContext);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!isNaN(audio.current.duration)) {
            const x = (audio.current.currentTime/audio.current.duration) * 100;
            setTime(x);
        }
    }, [audio, audio.current.currentTime])


    return (
        <div className={"h-8 flex flex-col justify-center"}>
            <div className={"h-2 w-full bg-gray-500 border border-gray-500 flex flex-col justify-center group"}>
                <div className={"h-2 right-1/2 bg-black h-full"} style={{width: `${time}%`}}/>
                <div className={"absolute h-4 w-4 rounded-full bg-white opacity-0 group-hover:opacity-100"} style={{left: `${time}%`}}/>
            </div>
        </div>
    )
}

function AudioPlayer() {
    const {audio, playing, setPlaying, currentSong} = useContext(SongContext);
    const seekSlider = useRef();
    const volumeSlider = useRef();
    const [time, setTime] = useState("0:00");
    const [duration, setDuration] = useState("")
    const [hold, setHold] = useState(false);

    const getTime = useCallback(() => {
        let minutes = Math.floor(audio.current.currentTime / 60);
        let seconds = (((audio.current.currentTime / 60) - minutes) * 60 / 100).toFixed(2).split(".")[1];
        setTime(`${minutes}:${seconds}`);
            if (time === duration && time !== "0:00") {
                setPlaying(false)
            }
       }, [audio, duration, setPlaying, time])

    useEffect(() => {
        let minutes = Math.floor(audio.current.duration / 60);
        let seconds = (((audio.current.duration / 60) - minutes) * 60 / 100).toFixed(2).split(".")[1];
        if (isNaN(minutes)) {
            minutes = "0"
        }
        if (seconds === undefined) {
            seconds = "00"
        }
        setDuration(`${minutes}:${seconds}`);

    }, [audio, time])

    useLayoutEffect(() => {
        audio.current.addEventListener("timeupdate", timeUpdate)
    }, [audio, timeUpdate])

    // eslint-disable-next-line react-hooks/exhaustive-deps
   function timeUpdate() {
        if (!hold) {
            seekSlider.current.value = (audio.current.currentTime / audio.current.duration) * 1000
        }
   }

   function changeTime() {
       audio.current.currentTime = (seekSlider.current.value / 1000) * audio.current.duration
   }

   function removeTime() {
        audio.current.removeEventListener("timeupdate", timeUpdate)
   }

   function setListener() {
        if (playing) {
            audio.current.removeEventListener("timeupdate", timeUpdate);
        } else {
            audio.current.addEventListener("timeupdate", timeUpdate);
        }
   }


    return (
        <div className={"bg-gray-700 p-6 w-full flex justify-center"}>
            <div className={"w-3/4 flex flex-row gap-4"}>
                <audio src={""} id={"song"} ref={audio} onTimeUpdate={() => {getTime()}}/>
                <div className={"w-20 text-center"}>
                    <button
                        id={"playButton"}
                        disabled={currentSong === ""}
                        className={`${(currentSong === "") ? "text-gray-600" : "hover:text-gray-300"}`}
                        onClick={() => {playing ? audio.current.pause() : audio.current.play(); setPlaying(!playing); setListener()}}
                    >
                        {playing ? "Pause" : "Play"}
                    </button>
                </div>
                <input
                    type="range"
                    min={"0"}
                    max={"1000"}
                    defaultValue={"0"}
                    id={"seekSlider"}
                    ref={seekSlider}
                    step={"1"}
                    onDrag={() => {setHold(true); removeTime()}}
                    onMouseUp={() => {changeTime(); setHold(false); audio.current.addEventListener("timeupdate", timeUpdate)}}
                    className={"w-full"}
                />
                <div className={"w-40 text-center"}>
                    <p>{`${time}/${duration}`}</p>
                </div>
                <label htmlFor={"volumeSlider"}>Volume</label>
                <input
                    type="range"
                    min={"0"}
                    max={"100"}
                    ref={volumeSlider}
                    defaultValue={"100"}
                    id={"volumeSlider"}
                    step={"1"}
                    onChange={() => {audio.current.volume = ((volumeSlider.current.value ** 1.5) / 1000)}}
                />
            </div>
        </div>
    )
}

function sliderHelper() {
    const rangeInputs = document.querySelectorAll('input[type="range"]')

    function handleInputChange(e) {
        let target = e.target
        if (e.target.type !== 'range') {
            target = document.getElementById('range')
        }
        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + 1 + '% 100%'
    }

    rangeInputs.forEach(input => {
        input.addEventListener('input', handleInputChange)
    })

}