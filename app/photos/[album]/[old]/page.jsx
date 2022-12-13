import Image from "next/image";
import fs from "fs";

export default function PhotoAlbum({params}) {
    const list = fs.readdirSync(`/Users/tylerteuber/WebstormProjects/website_test/public/${params.album}`);
    list.reverse();
    let open = false;
    function setOpen(value) {
        open = value;
    }

    return (
        <div className={""}>
            <h1 className={"text-8xl text-center mb-20"}>{params.album}</h1>
            <div className={"grid grid-cols-3 auto-rows-auto justify-items-center gap-y-8 hover:cursor-pointer"}>
                {list.map((name, idx) => {
                    return (
                        <div key={name} className={"h-80 w-80 border-4 border-black overflow-hidden bg-black"}>
                            <Image src={`/../public/${params.album}/${list[idx]}`} alt={"kaia"} height={400} width={400} className={"object-contain relative min-h-full"}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}