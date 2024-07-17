import React from "react";
import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import {
    ChatBubbleOvalLeftIcon,
    Cog6ToothIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    UsersIcon,
} from "@heroicons/react/24/solid/index.js";
import {
    BellIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/outline/index.js";
import classNames from "classnames";
import useSidebar from "@/Hooks/useSidebar.jsx";
import BottomNav from "@/Components/BottomNav.jsx";

export default function Authenticated({ user, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useSidebar();

    return (
        <div className="min-h-screen flex w-full bg-white text-slate-800">
            <div className="flex bg-white fixed w-full h-16 items-center gap-4 border-b px-6 justify-end">
                <div>
                    <input
                        className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="border-r px-4 hidden sm:block">
                        <BellIcon className="h-6 w-6 cursor-pointer text-slate-700" />
                    </div>
                    <div className="ml-2 flex items-center justify-center gap-2">
                        <div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link
                                        className="sm:hidden"
                                        href={route("profile.edit")}
                                    >
                                        Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={classNames(
                    "hidden z-10 bg-white sm:flex flex-col justify-between border-r pb-4 transition-all duration-300",
                    {
                        "w-52 px-4": isSidebarOpen,
                        "w-14 px-2": !isSidebarOpen,
                    },
                )}
            >
                <div>
                    <div
                        className={classNames("flex h-16 items-center", {
                            "justify-between pl-2": isSidebarOpen,
                            "justify-center": !isSidebarOpen,
                        })}
                    >
                        <h2
                            className={classNames(
                                "text-lg font-semibold italic",
                                {
                                    block: isSidebarOpen,
                                    hidden: !isSidebarOpen,
                                },
                            )}
                        >
                            Khalidy
                        </h2>
                        <div>
                            <ChevronLeftIcon
                                className={classNames(
                                    "w-8 cursor-pointer rounded-full bg-slate-200 stroke-slate-400 hover:stroke-slate-800 p-1 ease-in transition duration-300",
                                    {
                                        "rotate-180": !isSidebarOpen,
                                    },
                                )}
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            />
                        </div>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <Link
                            className="flex rounded-md transition-all duration-150 hover:bg-slate-100 gap-2 px-2 py-1"
                            href={route("dashboard")}
                        >
                            <div className="min-w-6">
                                <HomeIcon className="text-slate-700" />
                            </div>
                            <p
                                className={classNames(
                                    "transition-all duration-150",
                                    {
                                        "opacity-100": isSidebarOpen,
                                        "opacity-0": !isSidebarOpen,
                                    },
                                )}
                            >
                                Home
                            </p>
                        </Link>
                        <Link className="flex rounded-md transition-all duration-150 hover:bg-slate-100 gap-2 px-2 py-1">
                            <div className="min-w-6">
                                <UsersIcon className="text-slate-700" />
                            </div>
                            <p
                                className={classNames(
                                    "transition-all duration-150",
                                    {
                                        "opacity-100": isSidebarOpen,
                                        "opacity-0": !isSidebarOpen,
                                    },
                                )}
                            >
                                Friends
                            </p>
                        </Link>
                        <Link className="flex rounded-md transition-all duration-150 hover:bg-slate-100 gap-2 px-2 py-1">
                            <div className="min-w-6">
                                <ChatBubbleOvalLeftIcon className="text-slate-700" />
                            </div>
                            <p
                                className={classNames(
                                    "transition-all duration-150",
                                    {
                                        "opacity-100": isSidebarOpen,
                                        "opacity-0": !isSidebarOpen,
                                    },
                                )}
                            >
                                Messages
                            </p>
                        </Link>
                    </nav>
                </div>
                <nav className="flex flex-col gap-4">
                    <Link
                        className="flex rounded-md transition-all duration-150 hover:bg-slate-100 gap-2 px-2 py-1"
                        href={route("profile.edit")}
                    >
                        <div className="min-w-6">
                            <Cog6ToothIcon className="text-slate-700" />
                        </div>
                        <p
                            className={classNames(
                                "transition-all duration-150",
                                {
                                    "opacity-100": isSidebarOpen,
                                    "opacity-0": !isSidebarOpen,
                                },
                            )}
                        >
                            Settings
                        </p>
                    </Link>
                    <Link className="flex rounded-md transition-all duration-150 hover:bg-slate-100 gap-2 px-2 py-1">
                        <div className="min-w-6">
                            <QuestionMarkCircleIcon className="text-slate-700" />
                        </div>
                        <p
                            className={classNames(
                                "transition-all duration-150",
                                {
                                    "opacity-100": isSidebarOpen,
                                    "opacity-0": !isSidebarOpen,
                                },
                            )}
                        >
                            Help
                        </p>
                    </Link>
                </nav>
            </div>
            <div className="w-full">
                <div className="h-[100vh] overflow-y-auto pt-24 pb-20 sm:pb-5">
                    {children}
                </div>
            </div>
            <BottomNav />
        </div>
    );
}
