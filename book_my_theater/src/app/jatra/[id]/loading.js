export default function Loading() {
    return (
        <>
            <section className="h-[100vh] flex justify-center items-center flex-wrap gap-10">
                <div className="w-[230px] h-[300px] rounded-lg bg-[#a2a2a26b]">
                </div>
                <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold font-nunito h-6 w-[300px] rounded-xs bg-[#7b7b7b2f]"></h1>
                        <h2 className="text-sm font-light font-nunito h-6 w-[250px] rounded-xs bg-[#7b7b7b2f]"></h2>
                    </div>
                    <div>
                        <pre className="text-sm font-bold font-nunito h-[150px] w-full rounded-xs bg-[#7b7b7b2f]">
                            
                        </pre>
                    </div>
                    <div className="flex flex-col text-sm font-light font-lato gap-2">
                        <span className="h-6 w-[50%] rounded-xs bg-[#7b7b7b2f]"></span>
                        <span className="h-6 w-[70%] rounded-xs bg-[#7b7b7b2f]"></span>
                    </div>
                    <div>
                        <button className="bg-[#6750A4] h-10 w-20 rounded-lg px-5 cursor-pointer py-1 font-semibold font-lato"></button>
                    </div>
                </div>
            </section>
        </>
    )
}