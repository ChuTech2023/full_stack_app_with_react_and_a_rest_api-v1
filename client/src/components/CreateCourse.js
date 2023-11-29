import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
    //state
    const [errors, setErrors] = useState([])

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    const navigate = useNavigate();

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
            const res = await fetch('http://localhost:5000/api/courses',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)

                })
            if (res.status === 201) {
                navigate('/')
            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors) 
            }else {
                throw new Error();
            }

        } catch (error) {
            console.log(error);
            setErrors(['Internal error occurred, try again'])
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div class="wrap">
            <h2>Create Course</h2>
            <div class="validation--errors">
                <Error errors={errors} /> 
            </div>
            <form onSubmit={handleSubmit}>
                <div class="main--flex">
                    <div>
                        <label for="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="" />

                        <p>By Joe Smith</p>

                        <label for="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription"></textarea>
                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="" />

                        <label for="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                    </div>
                </div>
                <button class="button" type="submit">Create Course</button>
                <button class="button button-secondary" onclick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateCourse