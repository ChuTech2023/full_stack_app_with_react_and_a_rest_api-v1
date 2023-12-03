import React from 'react'

//handling validation errors
function Error({ errors }) {
    let error = null;
    if (errors.length) {
        error = (
            < >
            <h3>Validation Errors</h3>
            <ul>
                {
                    errors && errors.map((error) => (<li key={error}>{error}</li>))
                }
            </ul>
        </>
        );
        
    }
    return error;
}

export default Error