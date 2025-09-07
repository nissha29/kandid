'use client';

import { Lead } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import LeadDetailSideSheet from "./LeadDetailSideSheet";
import { getStatusClass } from "@/lib/getStatusClass";

export default function LeadsTable() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [leadId, setLeadId] = useState<number | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const tableRef = useRef<HTMLDivElement>(null);

    const fetchLeads = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await axios.get(`/api/leads?limit=10&offset=${offset}`);
            setLeads(prev => [...prev, ...res.data.leads]);
            setOffset(prev => prev + res.data.leads.length);
            setHasMore(res.data.hasMore);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, offset]);

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!tableRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                fetchLeads();
            }
        };

        const tableDiv = tableRef.current;
        if (tableDiv) {
            tableDiv.addEventListener("scroll", handleScroll);
        }

        return () => tableDiv?.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, fetchLeads]);

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
                            {loading && (
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
