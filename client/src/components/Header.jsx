import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoLight, logoDark, moonIcon, sunIcon } from "../assets";

const Header = () => {
    const userTheme = localStorage.getItem("theme");
    const [logo, setLogo] = useState(logoLight);
    const [icon, setIcon] = useState(moonIcon)

    const themeCheck = () => {
        if (userTheme === "dark") {
            document.documentElement.classList.add("dark");
            setLogo(logoDark);
            setIcon(sunIcon);
            return;
        }
    }

    useEffect(() => {
        themeCheck();
    }, [logo])

    const themeSwitch = () => {
        // storing switchedIcon as a new variable to render state effectively
        const switchedIcon = document.documentElement.classList.contains("dark") ? moonIcon : sunIcon;

        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            setLogo(logoLight);
            setIcon(switchedIcon);
            localStorage.setItem("theme", "light");
            return;
        }
        setLogo(logoDark);
        setIcon(switchedIcon);
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }

    return (
        <header className='fixed z-10 w-full backdrop-blur-lg flex justify-between items-center bg-[#ffffffa3] dark:bg-[#0f172aab] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
            <Link to="/">
                <img src={userTheme === "dark" ? logoDark : logo} alt="logo" className='w-28 object-contain' />
            </Link>
            <div className='flex justify-between items-center gap-10'>
                <Link to="/create-post"
                    className='font-inter text-slate-900 dark:text-white'>
                    Create
                </Link>
                <Link to="/prompt-tips"
                    className='font-inter text-slate-900 dark:text-white'>
                    Prompt tips
                </Link>
                <button className='font-inter font-medium bg-teal-400 dark:bg-teal-900 text-white dark:text-slate-900 px-4 py-2 rounded-md' onClick={themeSwitch}>
                    <img src={icon} alt="dark mode toggle" />
                </button>
            </div>
        </header>
    )
}

export default Header