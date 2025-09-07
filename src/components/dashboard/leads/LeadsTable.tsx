'use client';

import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

export default function LeadsTable() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

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

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Pending": return "bg-purple-200 text-purple-700";
            case "Responded": return "bg-yellow-200 text-yellow-700";
            case "Contacted": return "bg-green-200 text-gray-700";
            case "Converted": return "bg-blue-200 text-blue-700";
            default: return "bg-gray-200 text-gray-700";
        }
    };

    return (
        <div className="shadow-2xl shadow-neutral-400 rounded-2xl">
            <div ref={tableRef} className="overflow-y-auto h-[47rem] rounded-2xl scrollbar-hide" style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
            >
                <table className="w-full border border-neutral-300 bg-neutral-50 text-sm text-neutral-700">
                    <thead>
                        <tr>
                            <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Name</th>
                            <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Company</th>
                            <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Campaign Name</th>
                            <th className="border-b border-neutral-300 p-5 text-left text-neutral-500 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
                            <tr key={`${lead.id}-${index}`} className="hover:bg-gray-200/60 hover:cursor-pointer">
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
                            <tr>
                                <td colSpan={4} className="p-4">
                                    <div className="flex justify-center items-center">
                                        <Loader className="animate-spin w-6 h-6 text-gray-600" />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
