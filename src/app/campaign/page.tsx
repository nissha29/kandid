import ProtectedRoute from "@/components/guard/ProtectedRoute";

export default function Campaign() {
    return <ProtectedRoute>
        <div>Campaign</div>
    </ProtectedRoute>
}