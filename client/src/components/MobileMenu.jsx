import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

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

const MobileMenu = () => {

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
                className='absolute flex flex-wrap w-full left-0 top-[4.5rem] gap-1 bg-slate-400 border-4 border-slate-400 transition-transform'>
                <Link
                    to="/create-post"
                    onClick={() => setIsVisible(isVisible => !isVisible)}
                    className='bg-slate-100 flex-[1_1_150px] text-center p-5 font-inter transition-colors hover:text-primary hover:dark:text-primary text-slate-900 dark:text-white'>
                    Create
                </Link>
                <Link
                    to="/prompt-tips"
                    onClick={() => setIsVisible(isVisible => !isVisible)}
                    className='bg-slate-100 flex-[1_1_150px] text-center p-5 font-inter text-slate-900 dark:text-white transition-colors hover:text-primary hover:dark:text-primary'>
                    Prompt tips
                </Link>
                <Link
                    to="https://openai.com/" target="_blank"
                    onClick={() => setIsVisible(isVisible => !isVisible)}
                    className='bg-slate-100 flex-[1_1_150px] text-center p-5 font-inter text-slate-900 dark:text-white transition-colors hover:text-primary hover:dark:text-primary'>
                    OpenAI
                </Link>
            </motion.div>
        </div>
    )
}

export default MobileMenu