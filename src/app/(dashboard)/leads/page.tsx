'use client'

import ProtectedRoute from "@/components/guard/ProtectedRoute";
import { useSidebarStore } from "@/store/store";
import { TbLayoutColumns } from "react-icons/tb";

export default function Leads() {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

    return <ProtectedRoute>
        <div>
            <div className="flex gap-3 py-8 justify-start items-center text-neutral-600 font-semibold">
                <TbLayoutColumns className="w-5 h-5 hover:cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
                <div>Leads</div>
            </div>
        </div>
    </ProtectedRoute>
}