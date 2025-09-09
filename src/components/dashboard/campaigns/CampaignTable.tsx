import { getStatusClass } from "@/lib/getStatusClass";
import { useCampaignStore } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CampaignTable() {
    const [filter, setFilter] = useState('All Campaigns');
    const tableRef = useRef<HTMLDivElement>(null);
    const { setIsOpen } = useCampaignStore();
    const { setCampaignName, setSelectedCampaignId } = useCampaignStore();

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['campaigns'],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await axios.get(`/api/campaign?limit=10&offset=${pageParam}`);
            return res.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {
                return allPages.length * 10;
            }
            return undefined;
        },
        initialPageParam: 0,
    });

    const campaigns = useMemo(() => data?.pages.flatMap(page => page.campaigns) || [], [data]);

    const filteredCampaigns = useMemo(() => {
        if (filter === 'All Campaigns') {
            return campaigns;
        }
        return campaigns.filter(campaign => campaign.status === filter);
    }, [filter, campaigns]);

    useEffect(() => {
        const handleScroll = () => {
            if (!tableRef.current || isLoading || isFetchingNextPage || !hasNextPage) return;
            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                fetchNextPage();
            }
        };

        const tableDiv = tableRef.current;
        if (tableDiv) {
            tableDiv.addEventListener("scroll", handleScroll);
        }

        return () => tableDiv?.removeEventListener("scroll", handleScroll);
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    function handleClick(id: number, name: string) {
        setIsOpen(true);
        setCampaignName(name);
        setSelectedCampaignId(id);
    }

    if (isError) return <div>Error loading leads.</div>;
    return <div>
        <div className="flex justify-between items-center mt-14">
            <div className="flex gap-6 bg-neutral-200 rounded-lg p-1 text-neutral-500 text-sm font-semibold justify-center items-center">
                <div className={`rounded-lg p-1 hover:cursor-pointer ${filter === 'All Campaigns' ? 'bg-neutral-50 text-neutral-600' : ''}`} onClick={() => setFilter('All Campaigns')}>All Campaigns</div>
                <div className={`rounded-lg p-1 hover:cursor-pointer ${filter === 'Draft' ? 'bg-neutral-50 text-neutral-600' : ''}`} onClick={() => setFilter('Draft')}>Draft</div>
                <div className={`rounded-lg p-1 hover:cursor-pointer ${filter === 'Active' ? 'bg-neutral-50 text-neutral-600' : ''}`} onClick={() => setFilter('Active')}>Active</div>
                <div className={`rounded-lg p-1 hover:cursor-pointer ${filter === 'Paused' ? 'bg-neutral-50 text-neutral-600' : ''}`} onClick={() => setFilter('Paused')}>Paused</div>
                <div className={`rounded-lg p-1 hover:cursor-pointer ${filter === 'Completed' ? 'bg-neutral-50 text-neutral-600' : ''}`} onClick={() => setFilter('Completed')}>Completed</div>
            </div>
            <input
                type="text"
                placeholder="Search Campaigns"
                className="bg-white px-4 py-2 rounded-lg border-2 border-neutral-400 focus:border-neutral-500 focus:outline-0"
            />
        </div>
        <div className="mt-6">
            <div className="shadow-2xl shadow-neutral-400 rounded-2xl bg-neutral-50">
                <div ref={tableRef} className="overflow-y-auto h-[38rem] rounded-2xl scrollbar-hide" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                >
                    <table className="relative w-full border border-neutral-300 text-sm text-neutral-700">
                        <thead className="sticky -top-1 z-10 bg-neutral-50 border border-neutral-50">
                            <tr>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Campaign Name</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Status</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Total Leads</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Successful Leads</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Response Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCampaigns.map((campaign, index) => (
                                <tr onClick={() => handleClick(campaign.id, campaign.campaignName)} key={`${campaign.id}-${index}`} className="hover:bg-gray-200/60 hover:cursor-pointer">
                                    <td className="border-b border-neutral-300 px-4 py-5 font-semibold text-neutral-700 text-lg">{campaign.campaignName}</td>
                                    <td className="border-b border-neutral-300 px-4 py-3">
                                        <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(campaign.status)}`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="border-b border-neutral-300 px-4 py-5 text-neutral-700">{campaign.totalLeads}</td>
                                    <td className="border-b border-neutral-300 px-4 py-5">{campaign.successfulLeads}</td>
                                    <td className="border-b border-neutral-300 px-4 py-5 text-neutral-700">{campaign.responseRate}</td>
                                </tr>
                            ))}
                            {(isLoading || isFetchingNextPage) && (
                                <>
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <tr key={`skeleton-${i}`} className="animate-pulse">
                                            <td className="border-b border-neutral-300 px-4 py-3 flex items-center gap-2">
                                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                            </td>
                                            <td className="border-b border-neutral-300 px-4 py-3">
                                                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                            </td>
                                            <td className="border-b border-neutral-300 px-4 py-3">
                                                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                            </td>
                                            <td className="border-b border-neutral-300 px-4 py-3">
                                                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                            </td>
                                            <td className="border-b border-neutral-300 px-6 py-3">
                                                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}