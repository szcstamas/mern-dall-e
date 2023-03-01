import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, FormField, Loader } from '../components';
import Typed from "typed.js";

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
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["special", "beautiful", "awesome"],
            startDelay: 300,
            typeSpeed: 100,
            backDelay: 1000,
            backSpeed: 150,
            smartBackspace: false,
            showCursor: false,
            loop: true,
        });
    }, [])

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
            }, 500),
        );
    };

    return (
        <>
            <section className="relative overflow-hidden isolate mx-auto min-h-[80vh] flex justify-center align-center flex-col bg-slate-200 dark:bg-slate-900">
                <div className="min-w-[90rem] max-w-[90rem] mx-auto">
                    <h1 className="font-extrabold text-[#222328] dark:text-slate-100 text-[64px] text-left">Create something <span ref={el} className="text-teal-800"></span></h1>
                    <p className="my-10 dark:text-slate-50 text-[#666e75] text-[18px] max-w-[500px] md:max-w-full text-left">Welcome to the world of AI generated images! Shall we begin?</p>
                    <Link to="/create-post" className='font-inter block max-w-full md:max-w-xs text-center font-bold bg-[#272727] dark:bg-teal-800 text-white dark:text-slate-100 p-5 rounded-md tracking-wider'>LET'S GO!</Link>
                </div>
                <div
                    id="carouselExampleSlidesOnly"
                    class="relative"
                    data-te-carousel-init
                    data-te-carousel-slide>
                    <div
                        class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                        <div
                            class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item
                            data-te-carousel-active>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                                class="block w-full"
                                alt="Wild Landscape" />
                        </div>
                        <div
                            class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                                class="block w-full"
                                alt="Camera" />
                        </div>
                        <div
                            class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                            data-te-carousel-item>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                                class="block w-full"
                                alt="Exotic Fruits" />
                        </div>
                    </div>
                </div>
                <div className="absolute -z-10 w-[60%] rounded-r-[20%] h-[200%] bg-gradient-radial dark:from-black dark:to-slate-800  from-white via-white to-slate-400 dark:via-slate-900 blur-[70px]">
                </div>
                <div className="absolute -z-20 w-full h-full bg-no-repeat bg-right bg-[url('assets/hero-1.png')]">
                </div>
            </section>
            <section className="max-w-7xl mx-auto mt-20 pb-20">
                <div>
                    <h1 className="font-extrabold text-[#222328] dark:text-slate-100 text-[32px]">The Community Showcase</h1>
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
                            <Loader />
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