import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getStatusClass } from "@/lib/getStatusClass";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function LeadDetailSideSheet({
    leadId,
    onClose
}: {
    leadId: number | null,
    onClose: () => void
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (leadId !== null) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [leadId]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["lead", leadId],
        queryFn: async () => {
            const res = await axios.get(`/api/leads/${leadId}`);
            return res.data.lead;
        },
        enabled: leadId !== null,
    });

    if (leadId === null && !visible) return null;

    const lead = data || null;

    return (
        <div className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>

            <div className={`relative ml-auto w-96 bg-white h-full shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Lead Profile</h2>
                    <button onClick={handleClose}>
                        <X className="text-neutral-700 w-10 h-10 hover:cursor-pointer hover:bg-neutral-300 p-2 rounded-full" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>
                ) : lead ? (
                    <div>
                        <div className="flex items-center gap-8 mb-4 w-full">
                            <Image src={lead.imageUrl} width={60} height={60} className="rounded-full" alt="Lead Image" />
                            <div>
                                <div className="font-semibold text-neutral-800 text-xl">{lead.leadName}</div>
                                <div className="text-sm text-neutral-600 flex justify-between items-center gap-1">
                                    <span>{lead.company}</span>
                                    <span className={`ml-2 px-2 py-0.5 ${getStatusClass(lead.status)} rounded text-sm`}>
                                        {lead.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-neutral-600 mt-10">
                            <div>
                                <span className="font-semibold text-neutral-800">Contact:</span> {lead.contact || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold text-neutral-800">Email:</span> {lead.email}
                            </div>
                            <div>
                                <span className="font-semibold text-neutral-800">Campaign:</span> {lead.campaignName || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold text-neutral-800">Last Contact Date:</span> {lead.lastContactDate ? new Date(lead.lastContactDate).toLocaleDateString() : "N/A"}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-sm text-neutral-500">No lead data available.</div>
                )}
            </div>
        </div>
    );
}
