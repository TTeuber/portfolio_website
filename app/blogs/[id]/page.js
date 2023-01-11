import Link from "next/link";

export default async function BlogPost({params, searchParams}) {

    return (
        <div className={"flex flex-col min-h-screen"}>
            <Link href={"/blogs"} className={"absolute"}>{"<"}Back</Link>
            <h1 className={"text-center mb-20 text-8xl mt-0"}>Title</h1>
            <div className={"flex justify-center px-6 flex-grow"}>
                <iframe src={"/blogs/test.html"} className={"w-full p-6 bg-gray-800 rounded-2xl text-2xl border-2 border-gray-700 shadow-2xl"}></iframe>
            </div>
        </div>
    )
}