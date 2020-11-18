import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './CreateNewAccount.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors';
import * as actions from '../../store/actions'
import Input from '../Input/Input'
import {checkValidity} from '../../shared/utility'
import axios from '../../shared/axios-base'

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
}))(Button)

class CreateNewAccount extends Component {
    state = {
            submitMessage: '',
            formConfig: {
                onSubmit: (event) => this.loginSubmitHandler(event),
                errorSubmitMessage: ''
            },
            formControls: {
                firstName: {
                    elemType: 'input',
                    value: '',
                    elemConfig: {
                        type: 'input',
                        placeholder: 'First name'
                    },
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                    span: "half",
                    valid: false,
                },
                lastName: {
                    elemType: 'input',
                    value: '',
                    elemConfig: {
                        type: 'input',
                        placeholder: 'Last name'
                    },
                    validation: {
                        required: true,
                        minLength: 6,
                    },
                    span: "half",
                    valid: false
                },
                email: {
                    elemType: 'input',
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
                    valid: false
                },
                password: {
                    elemType: 'input',
                    value: '',
                    elemConfig: {
                        type: 'password',
                        placeholder: 'Password',
                    },
                    validation: {
                        required: true,
                        minLength: 3,
                    },
                    valid: false
                },
                file: {
                    elemType: 'file',
                    value: '',
                    elemConfig: {
                        type: 'file',
                        
                    },
                    validation: {
                        // required: true,
                        // minLength: 3,
                    },
                    valid: false
                }
            },
    }
    inputChangedHandler = ( event, categoryName, controlName ) => {
        // const updatedControls = {
        //                             ...this.state[categoryName], 
        //                             [controlName]: {
        //                                 ...this.state[categoryName][controlName], 
        //                                 value: event.target.value,
        //                                 valid: checkValidity(event.target.value, this.state[categoryName][controlName].validation)
        //                             }
        //                         }
        // this.setState({ [categoryName] : updatedControls })
        // console.log(this.state)
    }
    loginSubmitHandler = (event) => {
        event.preventDefault();
        // let error = '';
        // let sendReq = true;
        // for(let key in this.state.formControls) {
        //     if(key !== 'formConfig') {
        //          sendReq = sendReq && this.state.formControls[key].valid
        //     }
        // }
        // if(sendReq)
        //      this.props.onAuth(this.state.formControls.email.value, this.state.formControls.password.value)
        //  else
        //     error = 'Fill in the required fields correctly!';
        //  this.setState({submitMessage: error});
    }

    upload = (file, onUploadProgress) => {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post("/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    };

    getFiles = () => {
        return axios.get("/files");
    };

    render() {
        let form = null;
        let formElements = [];

        for(let j in this.state.formControls) {
            // console.log(this.state.formControls[j])
            formElements.push(<Input
                key={j}
                identifier={j}
                elementType={this.state.formControls[j].elemType}
                className={styles.input 
                            + (!this.state.formControls[j].valid ? ' ' + styles.inputInvalid : '')
                            + (this.state.formControls[j].span === 'half' ? ' ' + styles.inputSpanHalf : '')}
                elemConfig={this.state.formControls[j].elemConfig}
                value={this.state.formControls[j].value}
                onChange={(event) => this.inputChangedHandler(event, 'formControls', j)}
            />)
        }

        form =
            <form
                onSubmit={ this.state.formConfig.onSubmit }
                className={styles.rootForm}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.formHeader}>
                    Sign Up
                    <span>
                        It’s quick and easy.
                    </span>
                </div>
                <div className={styles.line}></div>
                {this.props.loginError !== null 
                    || this.state.submitMessage !== '' ?
                        <div className={styles.loginError}>
                            {this.props.loginError}
                            {this.state.submitMessage}
                        </div>
                    : null
                }

                {formElements}
                
                <SubmitButton
                    type='submit'
                    variant="contained"
                    className={styles.inputSpanHalf}
                >
                    Log In
                </SubmitButton>
                <SubmitButton
                    type='submit'
                    variant="contained"
                    className={styles.inputSpanHalf}
                    onClick={this.props.cancelNewAccount}
                >
                    Cancel
                </SubmitButton>
            </form>
        // console.log(forms)
        return <>  {form} </>
    }
}

const mapStateToProps = state => {
    return {
        loginError: state.auth.error,
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        onAuth: (email, pass) => dispatch( actions.authRequest(email, pass)),
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(CreateNewAccount);
