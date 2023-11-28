import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path='/courses/:id/update' element={<UpdateCourse />} />
          <Route path='/signin' element={<UserSignIn />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/signout' element={<UserSignOut />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
