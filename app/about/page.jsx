import Image from "next/image";

export default function About() {
    return (
        <div className={"flex flex-col items-center"}>
            <h1 className={"text-6xl lg:text-8xl text-center"}>About me</h1>
            <div className={"relative border rounded-full h-40 sm:h-80 w-40 sm:w-80 overflow-hidden flex justify-center m-10 sm:m-20 shadow-2xl"}>
                <Image src={"/me.jpg"} alt={"photo of me"} height={100} width={100} className={"relative object-fill object-center h-full w-full"}></Image>
            </div>
            <div className={"bg-gray-700 p-10 text-2xl mb-20 sm:border-2 sm:border-gray-500 sm:rounded-2xl sm:shadow-2xl"}>
                <p>
                    I&apos;m a 23 year old recent graduate from Western Washington University with a degree in economics and a minor in audio technology.

                    I have completed a data science internship based in python and am currently pursuing a career in web development.

                    I mainly focus on react and next.js, I have also used svelte, and some backend technologies like flask.
                </p>
            </div>
        </div>
    )
}