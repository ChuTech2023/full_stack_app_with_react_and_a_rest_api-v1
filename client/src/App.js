
import './App.css';
import { Routes, Route } from 'react-router-dom'

// App Components
import Courses from './components/Courses';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound.js';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path='/signin' element={<UserSignIn />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/signout' element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path='/courses/create' element={<CreateCourse />} />
            <Route path='/courses/:id/update' element={<UpdateCourse />} />
          </Route>
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
