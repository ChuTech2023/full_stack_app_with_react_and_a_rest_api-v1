import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


function Courses() {
    const [courses, setCourses] = useState([])

    //fetching courses and updating the courses state
    useEffect( () => {
        return () => {
            fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.log(err))
          }
    }, [])

  return (
    <div className="wrap main--grid">
               
                {
                    courses.map((course) => (
                        <Link className="course--module course--link" to={`/courses/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                        </Link>
                    ))
                }
                <Link className="course--module course--add--module" to="/courses/new">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
  )
}

export default Courses