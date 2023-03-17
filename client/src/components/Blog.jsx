import React from 'react'

const Blog = ({ h1, txt, subline, quotation }) => {
    return (
        <section className="relative overflow-hidden isolate 2xl:mx-auto min-h-[85vh] flex justify-center items-center md:gap-12 xl:gap-36 flex-col md:flex-row 2xl:flex-col bg-slate-200 dark:bg-slate-900 border-b-2 md:border-0">
            <div className="max-w-6xl px-10 md:px-0 text-center">
                <p className='uppercase text-slate-400 tracking-widest mb-5 2xl:mb-0'>
                    {subline}
                </p>
                <h1 className="flex justify-center 2xl:gap-5 font-extrabold text-[#222328] dark:text-slate-100 text-[42px] sm:text-[64px] overflow-hidden leading-tight 2xl:leading-tight flex-wrap">
                    {h1}
                </h1>
                <p className="my-10 dark:text-slate-50 text-[#666e75] text-[18px] md:max-w-[800px] max-w-full mx-auto">
                    {txt}
                </p>
                <div className='flex gap-8 justify-center items-center flex-col md:flex-row'>
                    <p>
                        {quotation}
                    </p>
                </div>
                <div>
                </div>
            </div>
        </section>
    )
}

export default Blog