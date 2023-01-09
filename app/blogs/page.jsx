import Link from "next/link";
import PocketBase from 'pocketbase';
import Image from "next/image";

const client = new PocketBase('http://127.0.0.1:8090')

export default async function Blogs() {
    const results = await client.records.getFullList('blogs');

    return (
            <div className={"text-gray-400 text-6xl lg:text-8xl flex flex-col items-center justify-center"}>
                <h1 className={"mb-20"}>Blogs Title</h1>
                {results.map((item) => <BlogItem key={item.id} blog={item}/>)}
            </div>
    )
}

function BlogItem({blog}) {
    return (
        <Link href={`/blogs/${blog.id}`} className={"w-4/5 transition-all duration-500 group"}>
            <div className={"border-2 border-gray-700 flex text-6xl mb-4 rounded-2xl bg-gray-800 group-hover:text-gray-300"}>
                <div className={"flex justify-center items-center fixed -z-10 lg:static lg:z-0"}>
                    <div className={"border border-black rounded-full overflow-hidden w-40 h-40 relative group-hover:w-44 group-hover:h-44 ease-in-out duration-200 m-4"}>
                        <Image src={"/../public/kaia_lights.jpg"} width={40} height={20} alt={"kaia"} className={"w-auto h-full object-cover relative"}/>
                    </div>
                </div>
                <div className={"lg:border-l-2 border-gray-700 py-2 px-4"}>
                    <h1 className={"mb-4 text-4xl md:text-6xl"}>{blog.title}</h1>
                    <p className={"text-2xl md:text-4xl"}>{blog.subtitle}</p>
                </div>
            </div>
        </Link>
    )
}