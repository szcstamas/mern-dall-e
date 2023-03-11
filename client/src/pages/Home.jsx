import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, FormField, Loader } from '../components';
import { hero1, hero2, hero3, hero4 } from "../assets";
import { heroText } from "../constants/heroText";

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
                    <h1 className="flex justify-start gap-5 font-extrabold text-[#222328] dark:text-slate-100 text-[64px] text-left overflow-hidden">Create something <span className="changeTextWrapper text-teal-700 underline transition-all block animate-fadeText opacity-0"
                        ref={txtSpan}
                    >{heroTextHomepage}</span>
                    </h1>
                    <p className="mt-10 mb-6 dark:text-slate-50 text-[#666e75] text-[18px] max-w-[500px] md:max-w-full text-left">Welcome to the world of AI generated images! Shall we begin?</p>
                    <Link to="/create-post" className='font-inter block max-w-full md:max-w-[14rem] text-center font-bold bg-[#272727] dark:bg-teal-800 text-white dark:text-slate-100 p-5 rounded-md tracking-wider'>LET'S GO!</Link>
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