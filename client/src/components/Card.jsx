import React from 'react';
import { download } from "../assets";
import { downloadImage } from "../utils"

const Card = ({ _id, name, prompt, photo }) => {
    return (
        <figure className='relative rounded-xl cardContainer overflow-hidden flex'>
            <span className='cardDot absolute h-5 w-5 rounded-full top-5 right-5 bg-white border-2 border-white transition-[background_200ms]'></span>
            <img
                className='cardContent flex-[0_1_100%] w-full h-full object-cover'
                src={photo}
                alt={prompt}
            />
            <figcaption className='cardToolbar absolute p-8 -bottom-[100%] w-full h-auto transition-all delay-100 bg-slate-800'>
                <p className='text-white text-md text-sm'>{prompt}</p>
                <div className='mt-5 flex justify-between items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <div className='w-7 h-7 rounded-full object-cover bg-primary flex justify-center items-center text-white text-xs font-bold'>
                            {name[0]}
                        </div>
                        <p className='text-white text-sm'>{name}</p>
                    </div>
                    <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none"><img src={download} alt="download" className='w-6 h-6 object-contain invert' /></button>
                </div>
            </figcaption>
        </figure>
    )
}

export default Card