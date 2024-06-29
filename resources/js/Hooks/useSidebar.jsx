import { useState, useEffect } from "react";

const SIDEBAR_STATE_KEY = "isSidebarOpen";

export default function useSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    useEffect(() => {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    return [isSidebarOpen, setIsSidebarOpen];
}
