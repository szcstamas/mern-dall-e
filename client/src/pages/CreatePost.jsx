import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview, downloadIcon, generateIcon, shareIcon } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('https://dall-e-zlz3.onrender.com/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('https://dall-e-zlz3.onrender.com/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...form }),
                });

                await response.json();
                alert('Success');
                navigate('/');
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    };

    return (
        <section className="max-w-7xl mx-auto py-10 md:py-32 px-5 xl:px-0">
            <div>
                <h1 className="font-extrabold text-[#222328] dark:text-slate-100 text-[32px]">Create</h1>
                <p className="mt-2 text-[#666e75] dark:text-slate-50 text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
            </div>

            <form className="mt-16 max-w-3xl md:max-w-full flex flex-col" onSubmit={handleSubmit}>
                <div className='flex w-full flex-col md:flex-row gap-12 justify-between'>
                    <div className="flex flex-col w-full md:w-[65%] justify-between">
                        <div className='flex flex-col gap-10'>
                            <FormField
                                labelName="Your Name"
                                type="text"
                                name="name"
                                placeholder="Ex., john doe"
                                value={form.name}
                                handleChange={handleChange}
                            />
                            <FormField
                                labelName="Prompt"
                                type="text"
                                name="prompt"
                                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                                value={form.prompt}
                                handleChange={handleChange}
                                isSurpriseMe
                                handleSurpriseMe={handleSurpriseMe}
                            />

                            <div className="flex gap-5">
                                <button
                                    type="button"
                                    onClick={generateImage}
                                    className=" text-white bg-[#008A93] font-medium rounded-md text-sm w-auto xs:w-full p-5 text-center"
                                >
                                    {generatingImg ? 'Generating...' : 'Generate'} <img src={generateIcon} alt="generate image" className='inline ml-3' />
                                </button>
                                {form.photo &&
                                    <a
                                        href={form.photo}
                                        download={`downloaded-${form.photo.substring(0, 40)}`}
                                        className=" text-white block bg-primary font-medium rounded-md text-sm w-auto xs:w-full p-5 text-center"
                                    >
                                        Download <img src={downloadIcon} alt="download image" className='inline ml-3' />
                                    </a>
                                }
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community</p>
                            <button
                                type="submit"
                                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-auto xs:w-full p-5 text-center"
                            >
                                {loading ? 'Sharing...' : 'Share with the Community'} <img src={shareIcon} alt="share image" className='inline ml-3' />
                            </button>
                        </div>
                    </div>

                    <div className='w-full md:w-[35%]'>
                        <div className="relative bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 h-full flex justify-center items-center">
                            {form.photo ? (
                                <img
                                    src={form.photo}
                                    alt={form.prompt}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-9/12 h-9/12 object-contain opacity-40"
                                />
                            )}

                            {generatingImg && (
                                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                    <Loader bgColor="white" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CreatePost;