import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoLight, logoDark, moonIcon, sunIcon } from "../assets";
import { headerLinks } from '../constants/headerLinks';
import MobileMenu from './MobileMenu';

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
        <header className='fixed z-10 w-full bg-cover backdrop-blur-sm flex justify-between items-center text-sm bg-[#ffffffbb] dark:bg-[#0f172aab] border-b border-b-[#e6ebf4]'>
            <nav className='relative w-full flex justify-between items-center xl:px-32 px-4 py-4 '>
                <Link to="/">
                    <img src={userTheme === "dark" ? logoDark : logo} alt="logo" className='w-28 object-contain' />
                </Link>
                <div className='hidden md:flex justify-between items-center gap-10 '>
                    {
                        headerLinks.map((link) => {
                            return (
                                <Link
                                    target={link.target ? "_blank" : null}
                                    to={link.link}
                                    key={link.txt + 'desktopHeaderLink'}
                                    className='flex items-start gap-1 font-inter transition-colors hover:text-primary hover:dark:text-primary text-slate-900 dark:text-white'>
                                    {link.txt}
                                </Link>
                            )
                        })
                    }
                    <button className='analog-button shadow-[#272727_4px_4px_0px] active:shadow-[#272727_0px_0px_0px] dark:shadow-[#ffffff_4px_4px_0px] dark:active:shadow-[#ffffff_0px_0px_0px] font-inter font-medium dark:text-slate-50 px-4 py-2 rounded-md' onClick={themeSwitch}>
                        <img src={icon} alt="dark mode toggle" />
                    </button>
                </div>
                <MobileMenu
                    changeModeFunction={themeSwitch}
                    modeIcon={icon}
                    modeText={userTheme === "dark" ? "Light mode" : "Dark mode"}
                />
            </nav>
        </header>
    )
}

export default Header