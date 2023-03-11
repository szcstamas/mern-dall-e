import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, FormField, Loader } from '../components';
import { hero1, hero2, hero3, hero4 } from "../assets";
import { heroText } from "../constants/heroText";
import { benefits } from '../constants/benefits';
import { engineerImages } from '../assets/engineer';

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return (
            data.map((post) => <Card key={post._id} {...post} />)
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
        //clearing setInterval
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
            <section className="relative overflow-hidden isolate mx-auto min-h-[100vh] flex justify-center align-center flex-col bg-slate-200 dark:bg-slate-900">
                <div className="min-w-[90rem] max-w-[50%] mr-auto ml-32">
                    <p className='uppercase text-slate-400 tracking-widest'>Provided by DALL-E</p>
                    <h1 className="flex justify-start gap-5 font-extrabold text-[#222328] dark:text-slate-100 text-[64px] text-left overflow-hidden">Create something <span className="changeTextWrapper text-[#4357FF] underline transition-all block animate-fadeText opacity-0"
                        ref={txtSpan}
                    >{heroTextHomepage}</span>
                    </h1>
                    <p className="my-10 dark:text-slate-50 text-[#666e75] text-[18px] max-w-[500px] md:max-w-full text-left">Welcome to the world of AI generated images! Shall we begin?</p>
                    <div className='flex gap-8 items-center'>
                        <Link to="/create-post" className='font-inter block max-w-full md:max-w-[14rem] text-center font-bold bg-[#4357FF] dark:bg-primary text-white dark:text-slate-100 py-4 px-10 rounded-full tracking-wider'>Explore</Link>
                        <Link to="https://openai.com/research/dall-e" target="_blank" className='font-inter block max-w-full md:max-w-[14rem] text-center tracking-wider text-slate-700 bg-[#efefef] dark:bg-slate-800 text-white dark:text-slate-100 py-4 px-10 rounded-full'>About DALL-E</Link>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='absolute -z-10 w-full h-full clip-your-needful-style bg-slate-50 dark:bg-slate-900'></div>
                <div
                    ref={bgDiv}
                    className="absolute -z-20 w-full h-full bg-no-repeat bg-right"
                    style={{
                        backgroundImage: `url(${heroImage})`
                    }}
                >
                </div>
            </section>

            <section className="p-20 bg-slate-900 text-slate-100 dark:border-b-2 dark:border-t-2">
                <div className="max-w-7xl m-auto">
                    <div className='w-100 max-w-7xl flex justify-between gap-24'>
                        {benefits.map((benefit, index) => {
                            index++;
                            return (
                                <div className='flex flex-1 flex-col flex-wrap gap-9 relative border-2 rounded-2xl p-10'>
                                    <span className='absolute left-3 top-3 text-slate-300 opacity-50'>0{index}</span>
                                    <img className='m-auto w-10 h-10 block' src={benefit.img} alt={benefit.name} />
                                    <div>
                                        <h4 className='text-center font-bold text-2xl mb-2'>{benefit.name}</h4>
                                        <p className='text-center text-slate-400 text-sm'>{benefit.desc}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className='bg-slate-900 text-slate-100 min-h-[60vh] engineer-section'>
                <div className="min-w-[90rem] max-w-7xl m-auto pt-20 pb-36 flex justify-between gap-10">
                    <div className='w-1/2 relative'>
                        {engineerImages.map((image) => {
                            return (
                                <div className='engineer-image-box isolate absolute w-[300px] h-[400px] rounded-lg'>
                                    <img className='w-full h-full relative object-cover z-[1] rounded-2xl' src={image} alt={image} />
                                    <div className='white-background absolute w-[105%] h-[105%] rounded-3xl bg-gradient-to-b from-transparent via-transparent to-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50.5%] z-[0]'></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-1/2'>
                        <h1 className='text-primary text-4xl font-bold mb-10'>Be a professional prompt engineer!</h1>
                        <p className='text-slate-100 max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, eveniet! Eum deleniti magnam modi praesentium? Ipsam a incidunt vero placeat.</p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto mt-20 pb-20">
                <div>
                    <h2 className="font-extrabold text-[#222328] dark:text-slate-100 text-[32px]">The Community Showcase</h2>
                    <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
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
                            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
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