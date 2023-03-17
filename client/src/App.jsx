import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from './components';
import { Home, CreatePost, PromptTips, ErrorPage, BlogPage } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='pt-32 md:pt-0 w-full bg-[#f9fafe] dark:bg-slate-900 min-h-[calc(100vh-(128px))]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/prompt-tips" element={<PromptTips />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App