import React from 'react'

const EngineerImage = ({ image }) => {
    return (
        <div className='animate-levitate engineer-image-box isolate absolute w-1/2 h-auto xl:w-[300px] xl:h-[400px] rounded-lg'>
            <img className='w-full h-full relative object-cover z-[1] rounded-2xl' src={image} alt={image} />
            <div className='white-background absolute w-[105%] h-[105%] rounded-3xl bg-gradient-to-b from-transparent via-transparent to-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50.5%] z-[0]'></div>
        </div>
    )
}

export default EngineerImage