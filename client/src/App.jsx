import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='sm:p-0 px-4 py-8 w-full bg-[#f9fafe] dark:bg-gray-800 min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App