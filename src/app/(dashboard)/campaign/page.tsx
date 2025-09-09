'use client'

import CampaignSheet from "@/components/dashboard/campaigns/CampaignsSheet";
import ProtectedRoute from "@/components/guard/ProtectedRoute";
import { useCampaignStore, useSidebarStore } from "@/store/store";
import { ChevronRight } from "lucide-react";
import { TbLayoutColumns } from "react-icons/tb";

export default function Campaign() {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
    const { setIsOpen, campaignName, setCampaignName } = useCampaignStore();

    return <ProtectedRoute>
        <div>
            <div className="flex gap-3 py-8 justify-start items-center text-neutral-600 font-semibold">
                <TbLayoutColumns className="w-5 h-5 hover:cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div onClick={() => {
                    setIsOpen(false);
                    setCampaignName('');
                }} className="hover:bg-neutral-200 hover:cursor-pointer rounded-lg px-2 py-1">Campaign</div>
                {campaignName != '' && <div className="flex text-sm">
                    <ChevronRight className="w-5 h-5" />
                    <div className="">{campaignName}</div>
                </div>}
            </div>
            <div className="">
                <CampaignSheet />
            </div>
        </div>
    </ProtectedRoute>
}