import React, { Component } from 'react';

import styles from './RecoverAccountForm.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors';
import {checkValidity} from '../../shared/formValidation';
import axios from 'axios';
import ListElement from '../ListElement';
import { Typography } from '@material-ui/core';
import { Fragment } from 'react';

const SubmitButton = withStyles((theme) => ({
    root: {
        color: '#FFF',
        backgroundColor: 'var(--blue)',
        '&:hover': {
            backgroundColor: blue[900],
        },
        padding: 'calc(var(--form-size)/2) 16px',
        borderRadius: '10px',
        fontSize: '18px',
        maxHeight: '48px',
        textTransform: 'none',
        marginBottom: '12px',
    },
}))(Button);

class RecoverAccountForm extends Component {
    state = {
        submitMessage: '',
        formControls: {
            formConfig: {
                onSubmit: (event) => this.recoverAccountSubmitHandler(event),
            },
            email: {
                value: '',
                elemConfig: {
                    type: 'input',
                    placeholder: 'Email address'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
        },
        userAvatar: null,
        firstName: '',
        lastName: '',
        email: ''
    }
    
    inputChangedHandler  = ( event, categoryName, controlName ) => {
        const updatedControls = {
                                    ...this.state[categoryName], 
                                    [controlName]: {
                                        ...this.state[categoryName][controlName], 
                                        value: event.target.value,
                                        valid: checkValidity(event.target.value, this.state[categoryName][controlName].validation)
                                    }
                                }
        this.setState({ [categoryName] : updatedControls })
        // console.log(this.state)
    }
    focusInputHandler = (event, categoryName, controlName) => {
        event.preventDefault();
        this.props.focusFormHandler(event, 'RecoverAccountForm');
        const updatedControls = {
            ...this.state[categoryName], 
            [controlName]: {
                ...this.state[categoryName][controlName],
                touched: true,
            }
        }
        this.setState({ [categoryName] : updatedControls });
    }
    recoverAccountSubmitHandler = (event) => {
        event.preventDefault();
        let error = '';
        let sendReq = true;
        for(let key in this.state.formControls) {
            if(key !== 'formConfig') {
                    sendReq = sendReq && this.state.formControls[key].valid
            }
        }
        if(sendReq)
            this.requestSearchAccount(this.state.formControls.email.value)
        else
            error = 'Fill in the email!';
        this.setState({submitMessage: error});
    }
    arrayBufferToBase64(buffer, avatarType) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));        
        bytes.forEach((b) => binary += String.fromCharCode(b));        
        return 'data:' + avatarType + ';base64,' + window.btoa(binary);
    };
    requestSearchAccount = (email) => {
        axios.post('http://localhost:5000/recover/', {searchEmail: true, email: email})
        .then(res => {
                console.log(email)
                
                // this.setState({userAvatar: res.data.userAvatar});
                if(res.data.found === true) {
                    this.setState({
                        userAvatar: this.arrayBufferToBase64(res.data.userAvatar.data, res.avatarType),
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email
                    });
                } else {
                    // console.log(res.data.error)
                    this.setState({
                        userAvatar: null,
                        firstName: '',
                        lastName: '',
                        email: '',
                        submitMessage: res.data.message
                    });
                }
            })
            .catch(err => {
                console.log(err)
                // dispatch(authFail(err.response.data.error))
            })
    }

    requestRecoverAccount = (event, email) => {
        event.preventDefault();
        if(email !== '')
            axios.post('http://localhost:5000/recover/', {sendMail: true, email: email})
                .then(res => {
                    // console.log(res)
                    // this.setState({userAvatar: res.data.userAvatar});
                    if(res.data.error === false) {
                        this.setState({
                            userAvatar: null,
                            firstName: '',
                            lastName: '',
                            email: '',
                            submitMessage: res.data.message
                        });
                    } else {
                        // console.log(res.data.error)
                        this.setState({
                            submitMessage: res.data.message
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                    // dispatch(authFail(err.response.data.error))
                })
    }
    render() {
        let form = null;
        let formElements = [];
        for(let j in this.state.formControls) {
            if(j === 'formConfig') {
                continue;
            }
            // console.log(this.state.formControls[j])
            formElements.push(<input
                key={j}
                className={styles.input + (!this.state.formControls[j].valid && this.state.formControls[j].touched === true
                                                ? ' ' + styles.inputInvalid : '')} 
                type={this.state.formControls[j].elemConfig.type}
                placeholder={this.state.formControls[j].elemConfig.placeholder}
                onChange={(event) => this.inputChangedHandler(event, 'formControls', j)}
                onFocus={(event) => this.focusInputHandler(event, 'formControls', j)}
            />)
        }

        form =
            <form 
                // onSubmit={this.state.formControls.formConfig.onSubmit}
                className={styles.rootForm + (this.props.focusForm !== 'RecoverAccountForm' ?  ' ' + styles.smallSizeForm : '') }
            >
                <Typography variant='h5' style={{marginLeft: '32px'}}>Find Your Account</Typography>
                <div className={styles.loginError}>
                    {this.state.submitMessage}
                </div>
                {formElements}
                <SubmitButton
                    onClick={(event) => this.recoverAccountSubmitHandler(event)}
                    type='submit'
                    variant="contained"
                >
                    Search
                </SubmitButton>

                {this.state.userAvatar ? 
                    <Fragment>
                        <Typography style={{marginLeft: '32px'}}>Is this your account?</Typography>
                        <ListElement name={this.state.firstName + ' ' + this.state.lastName} 
                            description={this.state.email} avatar={this.state?.userAvatar}/>
                        <SubmitButton
                            onClick={(event) => this.requestRecoverAccount(event, this.state.email)}
                            type='submit'
                            variant="contained"
                        >
                            Recover
                        </SubmitButton>
                    </Fragment>
                : ''}
            </form>
        // console.log(this.state?.userAvatar)
        return <>
                {form}
            </>
    }
            
}


export default RecoverAccountForm;
