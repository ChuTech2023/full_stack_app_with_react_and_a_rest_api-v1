import React, { useRef, useContext, useState} from 'react'
import { useNavigate, useParams, Navigate} from 'react-router-dom'

import Error from './Error';
import UserContext from '../context/UserContext';

function UpdateCourse() {
    const { user } = useContext(UserContext);
    //sate
    const [errors, setErrors] = useState([])

    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded= useRef(null);

    //return the url params
    const {id} = useParams();

    const navigate = useNavigate();

     //Event handlers
     const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        try {
            const res = await fetch(`http://localhost:5000/api/courses/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)

                })
            if (res.status === 200) {
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

    //     try {
    //         fetch(`http://localhost:5000/api/courses/${id}`, 
    //         {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
        
    //     })
    //         .then(res => navigate('/'))
    //         .catch(err => console.log(err)) 
    //     } catch (error) {
            
    //     }
    // }

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
                        <input id="courseTitle" name="courseTitle" type="text" value="Build a Basic Bookcase" />

                        <p>By Joe Smith</p>

                        <label for="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription">High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.&#13;&#13;Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.&#13;&#13;Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.&#13;&#13;We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.&#13;&#13;As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.&#13;&#13;The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</textarea>
                    </div>
                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="14 hours" />

                        <label for="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded">* 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;* Finishing Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood Filler&#13;&#13;* Minwax Oil Based Polyurethane</textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onclick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateCourse