'use client'

import { useEffect, useRef, useState } from "react";
import { Home, Users, BarChart2, MessageSquare, Settings, FileText, User, ChevronsUpDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuthStore, useSidebarStore } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Leads");
  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const { isSidebarOpen } = useSidebarStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    {
      section: "Overview",
      items: [
        { name: "Dashboard", icon: <Home className="h-5 w-5" /> },
        { name: "Leads", icon: <Users className="h-5 w-5" /> },
        { name: "Campaign", icon: <BarChart2 className="h-5 w-5" /> },
        { name: "Messages", icon: <MessageSquare className="h-5 w-5" />, badge: "10+" },
        { name: "Linkedin Accounts", icon: <User className="h-5 w-5" /> },
      ],
    },
    {
      section: "Settings",
      items: [
        { name: "Setting & Billing", icon: <Settings className="h-5 w-5" /> },
      ],
    },
    {
      section: "Admin Panel",
      items: [
        { name: "Activity logs", icon: <FileText className="h-5 w-5" /> },
        { name: "User logs", icon: <User className="h-5 w-5" /> },
      ],
    },
  ];

  const handleClick = (name: string) => {
    setActiveItem(name);

    if (name === 'Dashboard') {
      router.push('/dashboard');
    } else if (name === 'Leads') {
      router.push('/leads');
    } else if (name === 'Campaign') {
      router.push('/campaign');
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div className={`h-full bg-white shadow-xl flex flex-col justify-between rounded-md transition-all ease-in-out duration-300 overflow-hidden ${isSidebarOpen ? 'w-64 p-3' : 'w-0 p-0'}`}>
      {isSidebarOpen && (
        <div>
        <div className="flex justify-center items-center border-b border-neutral-200 py-3">
          <Image src="https://linkbird.ai/images/linkbird-light-logo.svg" alt="logo" width={120} height={40} />
        </div>

        <div className="flex justify-between items-center gap-3 px-2 py-6">
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center text-neutral-500 font-bold">PE</div>
            <div>
              <div className="font-semibold text-neutral-800 tracking-wider">Kandid</div>
              <div className="text-xs text-neutral-600">Personal</div>
            </div>
          </div>
          <ChevronsUpDown className="w-5 h-5 text-neutral-500" />
        </div>

        <div className="overflow-y-auto h-[calc(100vh-220px)] py-4 space-y-4">
          {navItems.map((section) => (
            <div key={section.section}>
              <h2 className="text-xs font-semibold text-neutral-600 px-3 mb-2 tracking-wider">{section.section}</h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.name)}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-md transition-colors font-semibold ${activeItem === item.name ? "bg-accent-light/15 text-neutral-600" : "text-neutral-600 hover:bg-accent-light/10"
                      }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-accent-dark text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className="flex justify-between items-center gap-3 px-1 -py-36 hover:cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="flex justify-center items-center gap-3">
          <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center text-neutral-500 font-bold uppercase">{user?.name.charAt(0)}</div>
          <div>
            <div className="font-semibold text-neutral-800 tracking-wider text-sm truncate w-32">{user?.name}</div>
            <div className="text-xs text-neutral-600 truncate w-36">{user?.email}</div>
          </div>
        </div>
        <ChevronsUpDown className="w-5 h-5 text-neutral-500" />
        </div>
      )}

      {isOpen && isSidebarOpen && (
        <div
          ref={dropdownRef}
          className="absolute bottom-16 left-8 w-64 bg-white shadow-lg rounded-md border border-neutral-200 p-4 space-y-2 z-50"
        >
          <div className="flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-md cursor-pointer">
            <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center text-neutral-500 font-bold uppercase">
              {user?.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-neutral-800">{user?.name}</div>
              <div className="text-xs text-neutral-600">{user?.email}</div>
            </div>
          </div>
          <button
            className="hover:cursor-pointer border-t border-neutral-200 flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-md w-full text-left"
          >
            <Settings className="w-4 h-4" />
            Profile settings
          </button>
          <button
            className="hover:cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-rose-500 hover:bg-neutral-100 rounded-md w-full text-left"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
