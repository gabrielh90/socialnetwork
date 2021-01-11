import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';


const RecoverPassword = (props) => {
    const id = useParams().id;
    const [formControls, setFormControls] = useState([
        {password: {
            value: '',
            elemConfig: {
                type: 'password',
                placeholder: 'Email address'
            },
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false
        },
        repassword: {
            value: '',
            elemConfig: {
                type: 'password',
                placeholder: 'Email address'
            },
            validation: {
                required: true,
                minLength: 6,
                : true
            },
            valid: false,
            touched: false
        },
        
    },
    ])
    return <Fragment>
        <div>{id}</div>
    </Fragment>
}

export default RecoverPassword;