import { getStatusClass } from "@/lib/getStatusClass";
import { useCampaignStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Users, MessageCircle, ChartNoAxesColumn } from "lucide-react";

export default function CampaignOverview() {
    const { selectedCampaignId } = useCampaignStore();

    const { data, isLoading } = useQuery({
        queryKey: ["campaign", selectedCampaignId],
        queryFn: async () => {
            const res = await axios.get(`/api/campaign/${selectedCampaignId}`);
            return res.data.campaign;
        },
        enabled: selectedCampaignId !== null,
    });

    if (selectedCampaignId === null) return null;

    const campaign = data || null;
    console.log(campaign);

    if (selectedCampaignId === null || isLoading || !campaign) return <div className="p-6 space-y-8 bg-gray-50 min-h-screen animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="h-4 bg-gray-300 rounded w-3/5"></div>
                        <div className="h-6 bg-gray-300 rounded w-2/5"></div>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                {[1, 2].map((_, index) => (
                    <div key={index} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                {[1, 2,].map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>;

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-500 text-sm">Total Leads</p>
                        <p className="text-2xl font-bold text-gray-800">{campaign?.totalLeads}</p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-full">
                        <Users className="w-6 h-6 text-accent-dark" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-500 text-sm">Successul Leads</p>
                        <p className="text-2xl font-bold text-gray-800">{campaign?.successfulLeads}</p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-full">
                        <Users className="w-6 h-6 text-accent-dark" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-500 text-sm">Response Rate</p>
                        <p className="text-2xl font-bold text-gray-800">{Number(campaign?.responseRate).toFixed(2)}</p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-full">
                        <MessageCircle className="w-6 h-6 text-accent-dark" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-500 text-sm">Progress</p>
                        <p className="text-2xl font-bold text-gray-800">{Number(campaign?.progressBar).toFixed(2)}</p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-full">
                        <ChartNoAxesColumn className="w-6 h-6 text-accent-dark" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Campaign Progress</h3>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Acceptance Rate</p>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div
                                className="bg-accent-light h-2 rounded-full"
                                style={{ width: `${((campaign.successfulLeads / campaign.totalLeads) * 100).toFixed(2)}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {((campaign.successfulLeads / campaign.totalLeads) * 100).toFixed(2)} %
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Response Rate</p>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div
                                className="bg-accent-light h-2 rounded-full"
                                style={{ width: `${campaign.responseRate.toFixed(2)}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{campaign.responseRate.toFixed(2)} %</p>
                    </div>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Campaign Details</h3>

                    <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Campaign Name: {campaign.campaignName}</span>
                            <span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(campaign.status)}`}>
                                {campaign.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Start Date:</span>
                            <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Last Updated:</span>
                            <span>{new Date(campaign.updatedAt).toLocaleDateString()}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
