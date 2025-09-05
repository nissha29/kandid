'use client';

import { Play, Shield, X } from "lucide-react";
import Navbar from "./Navbar";
import Image from "next/image";
import { useState } from "react";
import { useAuthDialogStore } from "@/store/store";
import { Account } from "../auth/Account";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";

export default function Hero() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthDialogOpen, setIsAuthDialogOpen, view } = useAuthDialogStore();

    return (
        <div className="w-full flex flex-col justify-center items-center px-4 md:px-24 lg:px-28 xl:px-56 py-7">
            <Navbar />
            <div className="h-[45rem] w-full relative flex flex-col justify-start items-center">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 2px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 2px)
      `,
                        backgroundSize: "50px 50px",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
                        maskImage:
                            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
                    }}
                />
                <div className="flex justify-center items-center w-64 sm:w-96 gap-1.5 sm:text-sm text-neutral-800 mt-14 shadow-lg shadow-accent-dark/30 border border-accent-dark px-5 py-2 rounded-full tracking-wider text-xs text-center">
                    <Shield className="w-3 h-3 text-accent-dark" />
                    100% Guaranteed - No LinkedIn Suspensions
                </div>
                <div className="text-center text-3xl sm:text-5xl lg:text-6xl text-neutral-800 mt-14 font-semibold flex flex-col justify-center items-center gap-3">
                    <div className="tracking-tight">Effortless LinkedIn Outreach</div>
                    <div className="tracking-tighter z-10">100% Safe and Scalable</div>
                </div>
                <div className="text-center mt-10 flex flex-col justify-center items-center text-neutral-600 z-10 text-lg tracking-wide font-thin">
                    <div>Automate LinkedIn outreach securely, generate leads, and boost</div>
                    <div>meetings without any risk of getting banned</div>
                </div>
                <div className="mt-10 z-10">
                    <button className="px-8 py-1.5 bg-accent-dark text-white rounded-lg text-lg hover:cursor-pointer" onClick={() => setIsAuthDialogOpen(true)}>Get Started Now</button>
                </div>
                <div className="py-16">
                    <div onClick={() => setIsOpen(true)} className="relative z-10 group hover:cursor-pointer">
                        <Image
                            src="/landing.jpg"
                            width={2000}
                            height={1800}
                            alt="landing"
                            className="w-full h-full rounded-lg border-2 border-neutral-300"
                        />

                        <div className="absolute inset-0 rounded-lg bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="p-3 hover:scale-105 hover:cursor-pointer ring-8 ring-accent-dark/15 rounded-full bg-gradient-to-r from-accent-dark/65 to-accent-light transition">
                                <Play className="w-8 h-8 fill-neutral-200 text-transparent" />
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-40 right-96 text-white hover:text-red-600 transition"
                    >
                        <X className="w-8 h-8 bg-neutral-800 hover:bg-neutral-900 hover:cursor-pointer text-white rounded-full" />
                    </button>

                    <div className="relative w-[90%] md:w-[70%] lg:w-[50%] aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/eumT0V__GVA?autoplay=1"
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>}

                {isAuthDialogOpen && <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20">
                    {view === "account" ? <Account /> : view === "register" ? <Register /> : <Login />}
                </div>}
            </div>
        </div>
    )
}