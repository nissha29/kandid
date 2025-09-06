import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-screen bg-neutral-50 flex flex-row gap-3`}>
      <div className="p-2">
        <Sidebar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}