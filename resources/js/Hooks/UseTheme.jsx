import { useState, useEffect } from "react";

const THEME_STATE_KEY = "theme";

export default function useTheme() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem(THEME_STATE_KEY);
        return savedTheme ? savedTheme : "light";
    });

    const isDarkMode = theme === "dark";

    const toggleDarkMode = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem(THEME_STATE_KEY, theme);
    }, [theme]);

    return [isDarkMode, toggleDarkMode];
}
