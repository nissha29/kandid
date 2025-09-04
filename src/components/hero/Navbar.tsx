import { useAuthDialogStore } from "@/store/store";
import Image from "next/image"

export default function Navbar() {
    const { setIsAuthDialogOpen } = useAuthDialogStore();

    return (
        <div className="w-full flex justify-around items-center shadow-lg bg-white rounded-xl py-3">
            <Image src={`https://linkbird.ai/images/linkbird-light-logo.svg`} alt="logo" width={150} height={150} />
            <div className="flex text-neutral-600/80 gap-20 font-semibold pr-10">
                <div className="hover:text-accent-light hover:cursor-pointer">Home</div>
                <div className="hover:text-accent-light hover:cursor-pointer">Features</div>
                <div className="hover:text-accent-light hover:cursor-pointer">Pricing</div>
            </div>
            <div>
                <button className="px-4 py-1.5 bg-accent-dark text-white rounded-lg hover:cursor-pointer" onClick={() => setIsAuthDialogOpen(true)}>Get Started</button>
            </div>
        </div>
    )
}