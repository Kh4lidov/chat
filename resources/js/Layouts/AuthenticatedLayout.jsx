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

export default function Authenticated({ user, children }) {
    return (
        <div>
            <div className="min-h-screen flex w-full bg-white text-slate-800">
                <div className="flex flex-col justify-between border-r pb-4 transition-all duration-300 w-52 px-4">
                    <div>
                        <div className="flex h-16 items-center justify-between pl-2">
                            <h2 className="text-lg font-semibold italic">
                                Khalidy
                            </h2>
                            <div>
                                <ChevronLeftIcon className="w-8 cursor-pointer rounded-full bg-slate-200 stroke-slate-400 p-1 transition-colors duration-200 hover:stroke-slate-800" />
                            </div>
                        </div>
                        <nav className="flex flex-col gap-4">
                            <Link
                                className="flex gap-2 rounded-md px-2 py-1 transition-all duration-150 hover:bg-slate-100"
                                href="/"
                            >
                                <div className="min-w-6">
                                    <HomeIcon className="text-slate-700" />
                                </div>
                                <p className="transition-all duration-150 opacity-100">
                                    Home
                                </p>
                            </Link>
                            <Link className="flex gap-2 rounded-md px-2 py-1 transition-all duration-150 hover:bg-slate-100">
                                <div className="min-w-6">
                                    <UsersIcon className="text-slate-700" />
                                </div>
                                <p className="transition-all duration-150 opacity-100">
                                    Friends
                                </p>
                            </Link>
                            <Link className="flex gap-2 rounded-md px-2 py-1 transition-all duration-150 hover:bg-slate-100">
                                <div className="min-w-6">
                                    <ChatBubbleOvalLeftIcon className="text-slate-700" />
                                </div>
                                <p className="transition-all duration-150 opacity-100">
                                    Messages
                                </p>
                            </Link>
                        </nav>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <Link className="flex gap-2 rounded-md px-2 py-1 transition-all duration-150 hover:bg-slate-100">
                            <div className="min-w-6">
                                <Cog6ToothIcon className="text-slate-700" />
                            </div>
                            <p className="transition-all duration-150 opacity-100">
                                Settings
                            </p>
                        </Link>
                        <Link className="flex gap-2 rounded-md px-2 py-1 transition-all duration-150 hover:bg-slate-100">
                            <div className="min-w-6">
                                <QuestionMarkCircleIcon className="text-slate-700" />
                            </div>
                            <p className="transition-all duration-150 opacity-100">
                                Help
                            </p>
                        </Link>
                    </nav>
                </div>
                <div className="flex grow flex-col">
                    <div className="flex h-16 items-center gap-4 border-b px-6 justify-end">
                        <div>
                            <input
                                className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                                type="text"
                                placeholder="Search"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="border-r px-4">
                                <BellIcon className="h-6 w-6 cursor-pointer text-slate-700" />
                            </div>
                            <div className="ml-2 flex items-center justify-center gap-2">
                                <div className="hidden lg:block">
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
                                                href={route("profile.edit")}
                                            >
                                                Profile
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
                    <div className="h-[44rem] overflow-y-auto">{children}</div>
                </div>
            </div>
        </div>
    );
}
