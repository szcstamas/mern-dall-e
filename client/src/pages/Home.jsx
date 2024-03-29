import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, FormField, Loader } from '../components';
import { happyFace, hero1, hero2, hero3, hero4, messenger, Udemy } from "../assets";
import { heroText } from "../constants/heroText";
import { benefits } from '../constants/benefits';
import { engineerImages } from '../assets/engineer';
import Benefit from '../components/Benefit';
import EngineerImage from '../components/EngineerImage';

//framer motion
import { motion } from 'framer-motion';

//swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return (
            <Swiper
                slidesPerView={3}
                spaceBetween={45}
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 640px
                    0: {
                        width: 300,
                        slidesPerView: 1,
                    },
                    640: {
                        width: 640,
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                }}
            >
                {data.map((post) =>
                    <SwiperSlide key={post._id + '_slide'} className="cursor-grab">
                        <Card key={post._id} {...post} />
                    </SwiperSlide>
                )}
            </Swiper>
        );
    }

    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
};

const Home = () => {
    const heroImages = [
        hero1,
        hero2,
        hero3,
        hero4
    ];
    const [heroIndex, setHeroIndex] = useState(1);
    const [heroImage, setHeroImage] = useState(hero1);
    const [heroTextHomepage, setHeroTextHomepage] = useState(heroText[0]);
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    const bgDiv = useRef();
    const txtSpan = useRef();

    //changing images with useEffect - restarting of interval occurs when heroIndex is changed 
    useEffect(() => {
        console.log("im running from home page!");
        //targeting bg img div
        const div = bgDiv.current;
        //targeting txt span
        const txt = txtSpan.current;

        //starting interval
        const interval = setInterval(() => {
            //looping between heroImages array (start from 0 index when reaches full length)
            heroIndex >= heroImages.length - 1 ? setHeroIndex(0) : setHeroIndex(prevIndex => prevIndex + 1);
            //adding animation-class
            div.classList.add("animate-fadeInOut");
            txt.classList.add("animate-fadeText");
            //setting heroImage to current
            setHeroImage(heroImages[heroIndex]);
            setHeroTextHomepage(heroText[heroIndex]);
            //clearing animation-class
            setTimeout(() => {
                div.classList.remove("animate-fadeInOut");
            }, 1000)
            setTimeout(() => {
                txt.classList.remove("animate-fadeText");
            }, 5000)
        }, 5000);
        //clearing setInterval for unmounting
        return () => clearInterval(interval);
    }, [heroIndex])

    const fetchPosts = async () => {
        setLoading(true);

        try {
            const response = await fetch('https://dall-e-zlz3.onrender.com/api/v1/post', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setAllPosts(result.data.reverse());
            }
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    //searching function
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        //filtering out results that matches search
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
                //set results to state
                setSearchedResults(searchResult);
            }, 1000),
        );
    };

    return (
        <>
            <section className="relative overflow-hidden isolate 2xl:mx-auto min-h-[85vh] 2xl:min-h-[100vh] flex justify-center items-center md:gap-12 xl:gap-36 flex-col md:flex-row 2xl:flex-col bg-slate-200 dark:bg-slate-900 border-b-2 md:border-0">
                {/* <div className='flex justify-between absolute bg-white dark:bg-slate-900 w-[300px] p-10 right-[40%] top-[70%] shadow-2xl border-4 border-[#efefef] dark:border-slate-700'>
                    <div className='flex justify-center items-center'>
                        <img src={happyFace} className="w-[50px]" alt="happy face" />
                    </div>
                    <div>
                        <h4 className='font-bold text-2xl mb-2 dark:text-slate-50'>Asar Madif</h4>
                        <p className='text-slate-600 dark:text-slate-50'>Nicely done!</p>
                    </div>
                </div> */}
                <div className="2xl:min-w-[90rem] 2xl:max-w-[50%] 2xl:mr-auto ml-0 md:ml-10 xl:ml-10 2xl:ml-32 px-10 md:px-0">
                    <p className='uppercase text-slate-400 tracking-widest mb-5 2xl:mb-0'>Provided by DALL-E</p>
                    <h1 className="flex justify-start 2xl:gap-5 font-extrabold text-[#222328] dark:text-slate-100 text-[42px] sm:text-[64px] text-left overflow-hidden leading-tight 2xl:leading-normal flex-wrap">Create something
                        <div className='overflow-hidden'>
                            <span className="changeTextWrapper text-[#4357FF] underline transition-all block animate-fadeText opacity-0"
                                ref={txtSpan}
                            >{heroTextHomepage}</span>
                        </div>
                    </h1>
                    <p className="my-10 dark:text-slate-50 text-[#666e75] text-[18px] max-w-[500px] md:max-w-full text-left">Welcome to the world of AI generated images! Shall we begin?</p>
                    <div className='flex gap-8 items-center flex-col md:flex-row'>
                        <Link to="/create-post" className='font-inter block max-w-full md:max-w-[14rem] text-center font-bold bg-[#4357FF] dark:bg-primary text-white dark:text-slate-100 py-4 px-10 rounded-full tracking-wider w-full md:w-auto'>Explore</Link>
                        <Link to="https://openai.com/research/dall-e" target="_blank" className='font-inter block max-w-full md:max-w-[14rem] text-center text-slate-800 tracking-wider bg-[#efefef] dark:bg-slate-800 dark:text-slate-100 py-4 px-10 rounded-full w-full md:w-auto'>About DALL-E</Link>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='absolute -z-10 w-full h-full clip-your-needful-style bg-slate-50 dark:bg-slate-900'></div>
                <div
                    ref={bgDiv}
                    className="2xl:absolute w-[100%] h-[400px] md:h-[500px] mt-10 md:mt-0 md:rounded-l-3xl bg-cover 2xl:bg-auto 2xl:-z-20 2xl:w-full 2xl:h-full bg-no-repeat bg-right block"
                    style={{
                        backgroundImage: `url(${heroImage})`
                    }}
                >
                </div>
            </section>

            <section id="benefits" className="p-5 md:px-20 md:py-20 xl:px-0 bg-slate-900 dark:bg-slate-800 text-slate-100 dark:border-t-2">
                <div className="max-w-7xl m-auto">
                    <motion.div
                        className='w-100 max-w-7xl flex justify-between gap-4 md:gap-6 lg:gap-12 flex-wrap'>
                        {benefits.map((benefit, index) => {
                            index++;
                            return (
                                <motion.div
                                    initial={index % 2 ? { opacity: 0, transform: 'translateY(-50px)' } : { opacity: 0, transform: 'translateY(50px)' }}
                                    whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                                    transition={{
                                        default: { ease: [0, 0.71, 0.2, 1.01] },
                                        scale: { type: "spring", damping: 5, stiffness: 100, restDelta: 0.001 },
                                        duration: 1,
                                        delay: (index / 2)
                                    }}
                                    viewport={{ once: true }}
                                    key={index + 'benefitContainerOnHomepage'}
                                    className="flex flex-1 flex-col flex-wrap gap-9 relative border-2 rounded-2xl p-10"
                                >
                                    <Benefit
                                        index={index}
                                        name={benefit.name}
                                        img={benefit.img}
                                        desc={benefit.desc}
                                        key={index + 'benefitBoxOnHomepage'}
                                    />
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            <section className='bg-slate-900 dark:bg-slate-800 text-slate-100 min-h-[60vh] engineer-section overflow-hidden'>
                <div className="min-w-[90rem] max-w-7xl m-auto pt-28 xl:pt-20 pb-36 flex justiy-start 2xl:justify-between gap-20 flex-col md:flex-row pr-60 lg:pr-0 xl:pr-12 2xl:pr-0">
                    <motion.div
                        initial={{ opacity: 0, transform: 'translateX(-50px)' }}
                        whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                        transition={{
                            default: { ease: [0, 2, 0.5, 2] },
                            delay: .25
                        }}
                        viewport={{ once: true }}
                        className='flex-[1_1_50%] w-full max-w-[35%] xl:max-w-full xl:w-1/2 relative isolate'>
                        {engineerImages.map((image, index) => {
                            return (
                                <EngineerImage
                                    image={image}
                                    key={index + 'engineerImage'}
                                />
                            )
                        })}
                        <div className='-z-10 animate-changeColor absolute w-[1000px] h-[1000px] top-20 -left-1/2 bg-primary rounded-full'></div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, transform: 'translateX(50px)' }}
                        whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                        transition={{
                            duration: .5,
                            delay: .5
                        }}
                        viewport={{ once: true }}
                        className='flex-[1_1_50%] z-10 md:w-auto xl:max-w-full xl:w-1/2'>
                        <h1 className='text-primary text-4xl font-bold mb-10 xl:max-w-full max-w-md'>Be a professional prompt engineer!</h1>
                        <p className='text-slate-100 max-w-lg mb-10'>Want to know more about making AI generated images? You want to get your skills to a more professional level? <strong>Take part of high-level courses provided by Udemy!</strong></p>
                        <Link to="https://www.udemy.com/topic/prompt-engineering/" target="_blank" className='font-inter flex gap-2 items-center justify-between max-w-full md:w-[55%] text-center font-bold bg-[#5624d0] dark:bg-primary text-white dark:text-slate-100 py-4 px-10 rounded-full tracking-wider border-white border-4 xl:border-0'>
                            Browse courses
                            <img src={Udemy} alt="udemy logo" className='block w-[100px]' />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto mt-20 px-5 xl:p-0">
                <motion.div
                    initial={{ opacity: 0, transform: 'translateY(50px)' }}
                    whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                    transition={{
                        default: { ease: [0, 2, 0.5, 2] },
                        duration: .5,
                    }}
                    viewport={{ once: true }}
                    className="max-w-7xl p-10 m-auto flex justify-between gap-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex-col md:flex-row">
                    <div className='flex gap-10 max-w-4xl justify-between flex-col md:flex-row'>
                        <img src={messenger} className="w-16" alt="messenger icon" />
                        <div className='flex flex-col gap-4'>
                            <h4 className='font-bold text-2xl text-black dark:text-slate-50'>Come and join our group!</h4>
                            <p className='text-black dark:text-slate-50'>Join our group on Facebook to receive latest informations and get connected to awesome people!</p>
                            <p className='text-slate-400 text-sm'>"I am so excited to be a part of this community! Thanks to all the people who have shared their tips, tricks, and DALL-E prompts. *twink" - Test User</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link to="https://www.facebook.com" className='font-inter block max-w-full md:max-w-[14rem] text-center font-bold bg-[#4357FF] dark:bg-primary text-white dark:text-slate-100 py-4 px-10 rounded-full tracking-wider w-full md:w-auto'>Join</Link>
                    </div>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto mt-20 pb-20 px-5 xl:px-0">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, transform: 'translateX(-25px)' }}
                        whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                        transition={{
                            duration: .25,
                        }}
                        viewport={{ once: true }}
                        className="font-extrabold text-[#222328] dark:text-slate-100 text-[32px]">The Community Showcase</motion.h2>
                    <motion.p
                        initial={{ opacity: 0, transform: 'translateX(-25px)' }}
                        whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                        transition={{
                            duration: .25,
                            delay: .5
                        }}
                        viewport={{ once: true }}
                        className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</motion.p>
                </div>

                <div className="mt-16">
                    <FormField
                        labelName="Search posts"
                        type="text"
                        name="text"
                        placeholder="Search something..."
                        value={searchText}
                        handleChange={handleSearchChange}
                    />
                </div>

                <div className="mt-10">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Loader bgColor="black" />
                        </div>
                    ) : (
                        <>
                            {/* if searchText is active (the variable is set), render out this paragraph with search-keyword */}
                            {searchText && (
                                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                    Showing Results for <span className="text-[#222328]">{searchText}</span>:
                                </h2>
                            )}
                            <div>
                                {/* if search is active (that means searchText is set), render out cards that matches keyword */}
                                {searchText ? (
                                    <RenderCards
                                        data={searchedResults}
                                        title="No Search Results Found"
                                    />
                                ) : (
                                    <RenderCards
                                        data={allPosts}
                                        title="No Posts Yet"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;