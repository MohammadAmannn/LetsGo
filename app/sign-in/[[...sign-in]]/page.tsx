import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <div>
                <Image src='/bg.jpeg' width={900} height={600} className="object-contain h-full w-full" alt={""} />

                <div className="absolute top-10 right-0 p m-10 p-10">

                <SignIn />
                </div>
            </div>
        </>
    )


}