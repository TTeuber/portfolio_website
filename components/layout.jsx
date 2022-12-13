export default function Layout({children}) {
    return (
        <div className={"flex justify-center text-gray-400"}>
            <div className={"min-h-screen max-h-full w-3/4 p-8 pt-32"}>
                <div className={"fixed inset-0 top-20 left-1/8 right-1/8 max-h-full bg-gray-800 opacity-50 blur-md place-self-center z-0"}></div>
                <div className={"relative"}>
                    {children}
                </div>
            </div>
        </div>
        );
}