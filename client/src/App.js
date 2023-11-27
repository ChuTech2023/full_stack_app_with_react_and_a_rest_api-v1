import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';

function App() {
  
  return (
    <>
    <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
