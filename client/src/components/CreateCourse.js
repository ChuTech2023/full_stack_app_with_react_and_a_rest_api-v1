import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { api } from '../utils/apiHelper';
import Error from './Error';
import UserContext from '../context/UserContext';

function CreateCourse() {
    //state
    const [errors, setErrors] = useState([])
    const {user} = useContext(UserContext);

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    const navigate = useNavigate();

    //Event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            userId: user.id,
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }
        try {
            const res = await api("/courses", "POST", data, user);
            if (res.status === 201) {
                navigate('/')
            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors) 
            }else {
                throw new Error();
            }

        } catch (error) {
            setErrors(['Internal error occurred, try again'])
            navigate('/error');
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="wrap">
            <h2>Create Course</h2>
            <div className="validation--errors">
                <Error errors={errors} /> 
            </div>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime}  />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateCourse