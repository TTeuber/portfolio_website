import Image from "next/image";
import Link from "next/link";
import fs from "fs";

const path = "/Users/tylerteuber/WebstormProjects/website_test/public/images/"

export default function Photos() {
    const files = fs.readdirSync(path);
    files.sort((a, b) => {
        return -(fs.readdirSync(path + a).length - fs.readdirSync(path + b).length);
    })

    return (
        <div className={""}>
            <h1 className={"text-8xl text-center mb-20"}>Photo Albums</h1>
            <div className={"grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 auto-rows-auto justify-items-center"}>
                {files.map((i) => {
                    return (<Album key={i} name={i}/>)
                })}
            </div>
        </div>
    )
}

function Album(props) {
    const photos = fs.readdirSync(path + props.name + '/')
    return (
        <Link href={`/photos/${props.name}`} className={"flex flex-col items-center"}>
            <div className={"w-80 h-64 translate-x-8 hover:z-10 group hover:cursor-pointer"}>
                <div className={"mb-8 border-4 border-black h-64 w-64 flex justify-center absolute z-10 group-hover:-translate-y-4 ease-in-out duration-300"}>
                    <Image src={`/${props.name}/${photos[photos.length - 1]}`} loading={"lazy"} alt={"photo 1"} height={400} width={400} className={"object-top object-cover relative h-full"}/>
                </div>
                <div className={"mb-8 border-4 border-black h-64 w-64 flex justify-center rotate-6 translate-x-8 absolute group-hover:translate-x-12 group-hover:rotate-12 ease-in-out duration-300"}>
                    <Image src={`/${props.name}/${photos[Math.floor(photos.length/3) * 2]}`} loading={"lazy"} alt={"photo 2"} height={400} width={400} className={"object-top object-cover relative h-full"}/>
                </div>
                <div className={"mb-8 border-4 border-black h-64 w-64 flex justify-center -rotate-6 -translate-x-8 absolute group-hover:-translate-x-12 group-hover:-rotate-12 ease-in-out duration-300"}>
                    <Image src={`/${props.name}/${photos[Math.floor(photos.length/3)]}`} loading={"lazy"} alt={"photo 3"} height={400} width={400} className={"object-top object-cover relative h-full"}/>
                </div>
            </div>
            <h1 className={"text-4xl my-4"}>{props.name}</h1>
        </Link>
    )
}