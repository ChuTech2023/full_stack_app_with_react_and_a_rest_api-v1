import React from 'react'

function Error({ errors }) {
    return (
        < >
            <h3>Validation Errors</h3>
            <ul>
                {
                    errors && errors.map((error) => (<li key={error}>{error}</li>))
                }
            </ul>
        </>

    )
}

export default Error