import React, { useRef, useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Error from './Error';
import UserContext from '../context/UserContext';
import { api } from '../utils/apiHelper';
import NotFound from './NotFound';

function UpdateCourse() {
    const { user } = useContext(UserContext);
    //sate
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState();

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    //return the url params
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = api(`/courses/${id}`, 'GET')
                const json = await res.json();
                if (res.status === 200) {
                    setCourse(json);
                } else if (res.status === 404) {
                    navigate('/notfound');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log("Error fetching and parsing the data", error)
                navigate('/error');
            }
        }
        fetchCourse();
    }, [id, navigate])

    //Event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        try {
            const res = await api(`/courses/${id}`, "PUT", data);
            if (res.status === 204) {
                navigate('/')
            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors)
            } else if (res.status === 403) {
                navigate('/forbidden');
            } else {
                throw new Error();
            }

        } catch (error) {
            console.log(error);
            setErrors(['Internal error occurred, try again'])
            navigate('/error');
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate(`/courses/${id}`);
    }


    return (
        <div className="wrap">
            <div class="validation--errors">
                <Error errors={errors} />
            </div>
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label for="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" defaultValue={course.title} type="text" value="Build a Basic Bookcase" />

                        <p>By Joe Smith</p>

                        <label for="courseDescription">Course Description</label>
                        <textarea id="courseDescription" defaultValue={course.description} name="courseDescription"></textarea>
                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" defaultValue={course.estimatedTime} name="estimatedTime" type="text" value="14 hours" />

                        <label for="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" defaultValue={course.materialsNeeded} name="materialsNeeded"></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onclick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse