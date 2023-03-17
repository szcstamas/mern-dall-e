import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className="relative overflow-hidden isolate 2xl:mx-auto min-h-[85vh] flex justify-center items-center md:gap-12 xl:gap-36 flex-col md:flex-row 2xl:flex-col bg-slate-200 dark:bg-slate-900 border-b-2 md:border-0">
            <div className="max-w-6xl px-10 md:px-0 text-center">
                <p className='uppercase text-slate-400 tracking-widest mb-5 2xl:mb-0'>404</p>
                <h1 className="flex justify-center 2xl:gap-5 font-extrabold text-[#222328] dark:text-slate-100 text-[42px] sm:text-[64px] overflow-hidden leading-tight 2xl:leading-tight flex-wrap">Oops! The page you requested was not found.
                </h1>
                <p className="my-10 dark:text-slate-50 text-[#666e75] text-[18px] max-w-[500px] md:max-w-full">The website could not show any related content to the subpage you was looking for.</p>
                <div className='flex gap-8 justify-center items-center flex-col md:flex-row'>
                    <Link to="/" className='font-inter block max-w-full md:max-w-[14rem] text-center font-bold bg-[#4357FF] dark:bg-primary text-white dark:text-slate-100 py-4 px-10 rounded-full tracking-wider w-full md:w-auto'>Go back</Link>
                </div>
                <div>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage