import { useAuthDialogStore } from "@/store/store";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaFileAlt, FaPhone, FaQuestionCircle } from "react-icons/fa";

export default function Navbar() {
    const { setIsAuthDialogOpen } = useAuthDialogStore();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: "Home", icon: null, href: "#" },
        { name: "Features", icon: null, href: "#" },
        { name: "Pricing", icon: null, href: "#" },
        { name: "FAQ", icon: <FaQuestionCircle />, href: "#" },
        { name: "Contact Us", icon: <FaPhone />, href: "#" },
        { name: "Help & Support", icon: <FaEnvelope />, href: "#" },
        { name: "Terms & Conditions", icon: <FaFileAlt />, href: "#" },
    ];

    return (
        <div className="w-full">
            <div className="w-full flex lg:justify-around justify-between items-center shadow-lg bg-white rounded-xl py-3 px-8 lg:px-0 relative z-20">
                <Image src="https://linkbird.ai/images/linkbird-light-logo.svg" alt="logo" width={150} height={150} />

                <div className="hidden lg:flex text-neutral-600/80 gap-20 font-semibold pr-10">
                    <div className="hover:text-accent-light hover:cursor-pointer">Home</div>
                    <div className="hover:text-accent-light hover:cursor-pointer">Features</div>
                    <div className="hover:text-accent-light hover:cursor-pointer">Pricing</div>
                </div>

                <div className="hidden lg:flex">
                    <button
                        className="px-4 py-1.5 bg-accent-dark text-white rounded-lg hover:cursor-pointer"
                        onClick={() => setIsAuthDialogOpen(true)}
                    >
                        Get Started
                    </button>
                </div>

                <button className="flex lg:hidden text-accent-dark" onClick={() => setIsOpen(prev => !prev)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden absolute top-24 left-0 w-full bg-white shadow-lg z-20 rounded-lg">
                    <div className="px-4">
                        <ul className="flex flex-col p-4 gap-6">
                            {menuItems.map((item, idx) => (
                                <li key={idx}>
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-3 text-gray-600 font-bold hover:text-gray-900 transition"
                                    >
                                        {item.icon && <span className="text-gray-500">{item.icon}</span>}
                                        <span className="font-semibold">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="p-4">
                            <button
                                className="w-full bg-accent-dark text-white py-2.5 rounded-lg font-semibold hover:cursor-pointer transition"
                                onClick={() => setIsAuthDialogOpen(true)}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
