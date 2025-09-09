import { CirclePlus } from "lucide-react";
import CampaignTable from "./CampaignTable";
import { useCampaignStore } from "@/store/store";
import CampaignOverview from "./CampaignOverview";

export default function CampaignSheet() {
    const { isOpen } = useCampaignStore();

    return <div className="px-9">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1.5">
                <div className="text-4xl font-semibold text-neutral-800">Campaigns</div>
                <div className="text-neutral-500">Manage your campaigns and track their performance</div>
            </div>
            <button className="bg-accent-dark px-4 py-2 flex justify-center items-center text-white rounded-lg gap-2"><CirclePlus className="w-5 h-5" /> Create Campaign</button>
        </div>
        {isOpen ? <CampaignOverview /> : <CampaignTable />}
    </div>
}