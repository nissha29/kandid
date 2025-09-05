import ProtectedRoute from "@/components/guard/ProtectedRoute";

export default function Leads() {
    return <ProtectedRoute>
        <div>Leads</div>
    </ProtectedRoute>
}