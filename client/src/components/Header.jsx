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
        <header className='fixed z-10 w-full bg-cover backdrop-blur-sm flex justify-between items-center bg-[#ffffffbb] dark:bg-[#0f172aab] border-b border-b-[#e6ebf4]'>
            <nav className='w-full flex justify-between items-center sm:px-32 px-4 py-4 '>
                <Link to="/">
                    <img src={userTheme === "dark" ? logoDark : logo} alt="logo" className='w-28 object-contain' />
                </Link>
                <div className='flex justify-between items-center gap-10'>
                    <Link to="/create-post"
                        className='flex items-start gap-1 font-inter transition-colors hover:text-primary hover:dark:text-primary text-slate-900 dark:text-white'>
                        Create
                    </Link>
                    <Link to="/prompt-tips"
                        className='font-inter text-slate-900 dark:text-white transition-colors hover:text-primary hover:dark:text-primary'>
                        Prompt tips
                    </Link>
                    <Link to="https://openai.com/" target="_blank"
                        className='font-inter text-slate-900 dark:text-white transition-colors hover:text-primary hover:dark:text-primary'>
                        OpenAI
                    </Link>
                    <button className='font-inter font-medium bg-primary text-white dark:text-slate-50 px-4 py-2 rounded-md' onClick={themeSwitch}>
                        <img src={icon} alt="dark mode toggle" />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header