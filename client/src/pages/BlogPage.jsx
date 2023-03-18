import React from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../components';
import { blogPosts } from '../constants/blogs';
import ErrorPage from './ErrorPage';

const BlogPage = () => {
    const params = useParams();
    const { id } = params;

    //filter out id of blogpost that matches with param
    const filteredBlogPost = blogPosts.filter(blog => blog.id == id);

    //if filtering of blogPosts array was successful, then begin rendering out subpage of recent blog
    if (filteredBlogPost.length > 0) {
        //destructuring given array
        const [currentBlogObj] = filteredBlogPost;
        //destructuring given obj
        const { subline, h1, txt, quotation } = currentBlogObj;

        //returning blogpost
        return <Blog
            subline={subline}
            h1={h1}
            txt={txt}
            quotation={quotation}
        />
    } else {
        //if given array is empty (so filtering was not successful, then render out errorpage)
        return (
            <ErrorPage />
        )
    }


}

export default BlogPage