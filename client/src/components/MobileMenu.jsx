import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { headerLinks } from '../constants/headerLinks';

const listVariants = {
    open: { opacity: 1, transform: 'translateX(0%)' },
    closed: { opacity: 0, transform: 'translateX(-100%)' },
}
const firstIconLine = {
    rotated: { transform: 'rotate(-45deg) translate(0px, 6px)' },
    unrotated: { transform: 'rotate(0deg)' },
}
const secondIconLine = {
    rotated: { transform: 'rotate(45deg) translate(0px, -7px)' },
    unrotated: { transform: 'rotate(0deg)' },
}

const MobileMenu = ({ changeModeFunction, modeIcon, modeText }) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className='block md:hidden'>
            <motion.button
                className='bg-transparent flex flex-wrap w-10 h-10 gap-1 items-center'
                onClick={() => setIsVisible(isVisible => !isVisible)}
            >
                <div className="hamburger-menu">
                    <motion.div
                        animate={isVisible ? "rotated" : "unrotated"}
                        variants={firstIconLine}
                        className="bar-top"></motion.div>
                    <motion.div
                        animate={isVisible ? "rotated" : "unrotated"}
                        variants={secondIconLine}
                        className="bar-bottom"></motion.div>
                </div>
            </motion.button>
            <motion.div
                animate={isVisible ? "open" : "closed"}
                variants={listVariants}
                className='absolute flex flex-wrap w-full left-0 top-[4.5rem] gap-1 bg-slate-400 dark:bg-slate-600 border-4 border-slate-400 dark:border-slate-600 transition-transform'>
                {
                    headerLinks.map((link) => {
                        return (
                            <Link
                                target={link.target ? "_blank" : null}
                                to={link.link}
                                key={link.txt + 'mobileLink'}
                                onClick={() => setIsVisible(isVisible => !isVisible)}
                                className='bg-slate-100 dark:bg-slate-900 flex-[1_1_200px] text-center p-5 font-inter transition-colors hover:text-primary hover:dark:text-primary text-slate-900 dark:text-white'>
                                {link.txt}
                            </Link>
                        )
                    })
                }
                <button className='flex-[1_1_200px] flex justify-center items-center gap-5 font-inter font-medium bg-primary text-white dark:text-slate-50 p-5 rounded-md' onClick={changeModeFunction}>
                    <img src={modeIcon} alt="dark mode toggle" />
                    <p>{modeText}</p>
                </button>
            </motion.div>
        </div>
    )
}

export default MobileMenu