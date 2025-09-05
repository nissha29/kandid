import ProtectedRoute from "@/components/guard/ProtectedRoute";

export default function Dashboard() {
    return <ProtectedRoute>
        <div>Dashboard</div>
    </ProtectedRoute>
}