import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react'
import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {checkValidity} from '../../shared/formValidation';
import styles from './RecoverPassword.css';
import axios from 'axios';

const SubmitButton = withStyles((theme) => ({
    root: {
        color: '#FFF',
        backgroundColor: 'var(--blue)',
        '&:hover': {
            backgroundColor: blue[900],
        },
        // padding: 'calc(var(--form-size)/2) 16px',
        borderRadius: '10px',
        width: '50%',
        fontSize: '18px',
        maxHeight: '48px',
        textTransform: 'none',
        marginBottom: '12px',
    },
}))(Button);

const RecoverPassword = (props) => {
    const id = useParams().id;
    const [responseMessage, setResponseMessage] = useState({
        message: '',
        redirect: false,
        redirectTimeout: 5,
        refInterval: null
    });
    const [formControls, setFormControls] = useState({
        password: {
            value: '',
            elemConfig: {
                type: 'password',
                placeholder: 'Enter the new password'
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
                placeholder: 'Reenter the password'
            },
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false
        },
    });
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const inputChangedHandler  = (index) => ( event ) => {
        const updatedControls = {
                                    ...formControls, 
                                    [index]: {
                                        ...formControls[index], 
                                        value: event.target.value,
                                        valid: checkValidity(event.target.value, formControls[index].validation)
                                    }
        }
        setFormControls(updatedControls);
    }

    const changePassword = (event) => {
        event.preventDefault();
        if(formControls['password'].value === formControls['repassword'].value) {
            axios.post('http://localhost:5000/recover/' + id, 
                        {
                            id: id,
                            password: formControls['password'].value
                        }
            )
            .then(res => {
                    // if(res.data.updated === true) {
                    //     setResponseMessage({...responseMessage, message: res.data.message});
                    // } else {
                    //     console.log(res.data.message)
                    // }
                    const refInterval = setInterval(function(){
                            clearInterval(responseMessage.refInterval);
                            setResponseMessage(prevState => 
                                            ({...prevState, 
                                            redirectTimeout: prevState.redirectTimeout - 1})
                                    );
                        }, 1000);

                    setResponseMessage({...responseMessage, 
                                        message: res.data.message, 
                                        redirect: true,
                                        redirectTimeout: 5,
                                        refInterval: refInterval,
                                    });
                    return res;
                })
                .catch(err => {
                    console.log(err)
                    // dispatch(authFail(err.response.data.error))
                })
        } else {
            setResponseMessage({...responseMessage, message: 'You have to enter the same password!'});
        }
    }

    let formElements = [];
    Object.keys(formControls).map((key, index) => {
        // console.log(key);
        formElements.push(
            <FormControl key={key} margin='normal' variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-password">{formControls[key].elemConfig.placeholder}</InputLabel>
                <OutlinedInput
                    error={!formControls[key].valid}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formControls[key].value}
                    onChange={inputChangedHandler(key)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label={formControls[key].elemConfig.placeholder}
                />
            </FormControl>
        );
        return key;
    });

    return <div className={styles.root}>
                <form 
                    onSubmit={(event) => changePassword(event)}
                    className={styles.rootForm}
                >
                    <Typography variant='h5' style={{marginLeft: '32px'}}>Change your password</Typography>
                    <div className={styles.loginError}>
                        {responseMessage.message}
                    </div>
                    <div className={styles.loginError}>
                        {responseMessage.redirect ?  
                                    ' You will be redirected in: ' + responseMessage.redirectTimeout : ''}
                    </div>
                    {formElements}
                    <SubmitButton
                        type='submit'
                        variant="contained"
                        disabled={!formControls['password'].valid || formControls['password'].value !== formControls['repassword'].value}
                        style={{marginLeft: '32px'}}
                    >
                        Change
                    </SubmitButton>
                </form>
                {responseMessage.redirectTimeout <= 0 ? <Redirect to='/' /> : '' }
            </div>
}

export default RecoverPassword;