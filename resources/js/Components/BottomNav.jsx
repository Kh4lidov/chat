import React from "react";
import {
    HomeIcon,
    UsersIcon,
    ChatBubbleOvalLeftIcon,
    BellIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2 sm:hidden">
            <Link
                href={route("dashboard")}
                className="flex flex-col items-center text-slate-700"
            >
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs">Home</span>
            </Link>
            <Link className="flex flex-col items-center text-slate-700">
                <UsersIcon className="w-6 h-6" />
                <span className="text-xs">Friends</span>
            </Link>
            <Link className="flex flex-col items-center text-slate-700">
                <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                <span className="text-xs">Messages</span>
            </Link>
            <Link className="flex flex-col items-center text-slate-700">
                <BellIcon className="w-6 h-6" />
                <span className="text-xs truncate w-[3.25rem]">
                    Notifications
                </span>
            </Link>
            <Link className="flex flex-col items-center text-slate-700">
                <Bars3Icon className="w-6 h-6" />
                <span className="text-xs">More</span>
            </Link>
        </div>
    );
}
