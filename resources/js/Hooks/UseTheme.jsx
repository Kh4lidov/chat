import { useState, useEffect } from "react";

const THEME_STATE_KEY = "theme";

export default function useTheme() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem(THEME_STATE_KEY);
        return savedTheme ? savedTheme : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem(THEME_STATE_KEY, theme);
    }, [theme]);

    return [theme, setTheme];
}
