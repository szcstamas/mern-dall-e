import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
    return (
        <div>
            <div className='flex items-center gap-2 mb-2'>
                <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-slate-100">
                    {labelName}
                </label>
                {isSurpriseMe && (
                    <button type="button" onClick={handleSurpriseMe} className="font-semibold text-xs bg-[#ECECF1] dark:bg-slate-900 dark:text-slate-100 py-2 px-3 rounded-[5px] text-black">Surprise me</button>
                )}
            </div>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
                className='bg-gray-200 dark:bg-slate-900 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
            />
        </div>
    )
}

export default FormField