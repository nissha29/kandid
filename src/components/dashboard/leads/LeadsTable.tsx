'use client';

import axios from "axios";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import LeadDetailSideSheet from "./LeadDetailSideSheet";
import { getStatusClass } from "@/lib/getStatusClass";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function LeadsTable() {
    const tableRef = useRef<HTMLDivElement>(null);
    const [leadId, setLeadId] = useState<number | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['leads'],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await axios.get(`/api/leads?limit=10&offset=${pageParam}`);
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

    const leads = data?.pages.flatMap(page => page.leads) || [];

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

    if (isError) return <div>Error loading leads.</div>;

    return (
        <div>
            <div className="shadow-2xl shadow-neutral-400 rounded-2xl bg-neutral-50 mx-36">
                <div ref={tableRef} className="overflow-y-auto h-[47rem] rounded-2xl scrollbar-hide" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                >
                    <table className="relative w-full border border-neutral-300 text-sm text-neutral-700">
                        <thead className="sticky -top-1 z-10 bg-neutral-50 border border-neutral-50">
                            <tr>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Name</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Company</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Campaign Name</th>
                                <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr key={`${lead.id}-${index}`} className="hover:bg-gray-200/60 hover:cursor-pointer" onClick={() => {
                                    setLeadId(lead.id);
                                    setIsSheetOpen(true);
                                }}>
                                    <td className="border-b border-neutral-300 px-4 py-3 flex justify-start items-center gap-2">
                                        <Image src={lead.imageUrl} width={50} height={50} className="rounded-full w-12 h-12" alt="Lead Image" />
                                        <div className="font-semibold text-neutral-700">{lead.leadName}</div>
                                    </td>
                                    <td className="border-b border-neutral-300 px-4 py-3 text-neutral-700">{lead.company}</td>
                                    <td className="border-b border-neutral-300 px-4 py-3 text-neutral-700">{lead.campaignName}</td>
                                    <td className="border-b border-neutral-300 px-4 py-3">
                                        <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
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
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isSheetOpen && leadId !== null && <LeadDetailSideSheet leadId={leadId} onClose={() => {
                setLeadId(null);
                setIsSheetOpen(false);
            }} />}
        </div>
    );
}
