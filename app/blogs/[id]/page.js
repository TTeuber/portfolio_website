import Link from "next/link";
import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090')

export default async function BlogPost({params, searchParams}) {
    const result = await client.records.getOne('blogs', params.id);

    return (
        <div className={"flex flex-col min-h-screen"}>
            <Link href={"/blogs"} className={"absolute"}>{"<"}Back</Link>
            <h1 className={"text-center mb-20 text-8xl mt-0"}>{result.title}</h1>
            <div className={"flex justify-center px-6 flex-grow"}>
                <p className={"w-full p-6 bg-gray-800 rounded-2xl text-2xl border-2 border-gray-700 shadow-2xl"}>{result.text}</p>
            </div>
        </div>
    )
}