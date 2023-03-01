import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoLight } from "../assets";
import { logoDark } from "../assets";

const Header = () => {

    const userTheme = localStorage.getItem("theme");
    const [logo, setLogo] = useState(logoLight);

    const themeCheck = () => {
        if (userTheme === "dark") {
            document.documentElement.classList.add("dark");
            setLogo(logoDark);
            return;
        }
    }

    useEffect(() => {
        themeCheck();
    }, [logo])

    const themeSwitch = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            setLogo(logoLight);
            localStorage.setItem("theme", "light");
            return;
        }
        setLogo(logoDark);
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }

    return (
        <header className='w-full flex justify-between items-center bg-white dark:bg-slate-900 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
            <Link to="/">
                <img src={userTheme === "dark" ? logoDark : logo} alt="logo" className='w-28 object-contain' />
            </Link>
            <div className='flex justify-between items-center gap-5'>
                <Link to="/create-post"
                    className='font-inter font-medium bg-[#008A93] text-white px-4 py-2 rounded-md'>
                    Create
                </Link>
                <button className='font-inter font-medium bg-[#272727] dark:bg-slate-500 text-white dark:text-slate-100 px-4 py-2 rounded-md' onClick={themeSwitch}>Night mode</button>
            </div>
        </header>
    )
}

export default Header