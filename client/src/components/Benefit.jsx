import React from 'react'

const Benefit = ({ index, img, name, desc }) => {
    return (
        <div className='flex flex-1 flex-col flex-wrap gap-9 relative border-2 rounded-2xl p-10'>
            <span className='absolute left-3 top-3 text-slate-300 opacity-50'>0{index}</span>
            <img className='m-auto w-10 h-10 block' src={img} alt={name} />
            <div>
                <h4 className='text-center font-bold text-2xl mb-2'>{name}</h4>
                <p className='text-center text-slate-400 text-sm'>{desc}</p>
            </div>
        </div>
    )
}

export default Benefit