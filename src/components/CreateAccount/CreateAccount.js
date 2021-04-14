import React, { Component } from 'react'

import styles from './CreateAccount.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors';
import Input from '../Input/Input'
import {checkValidity} from '../../shared/formValidation'
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

class CreateAccount extends Component {
    state = {
            submitMessage: '',
            formConfig: {
                onSubmit: (event) => this.createAccHandler(event),
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
                        minLength: 3,
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
                        minLength: 3,
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
                    file: null,
                    elemConfig: {
                        type: 'file',
                    },
                    validation: {
                        required: false,
                        minLength: 3,
                    },
                    valid: false
                },
                year: {
                    elemType: 'select',
                    value: '',
                    elemConfig: {
                        type: 'year',
                    },
                    validation: {
                        required: true,
                        minLength: 4
                    },
                    span: "three",
                    valid: false
                },
                month: {
                    elemType: 'select',
                    value: '',
                    elemConfig: {
                        type: 'month',
                    },
                    validation: {
                        required: true,
                        minLength: 1,
                    },
                    span: "three",
                    valid: false
                },
                day: {
                    elemType: 'select',
                    value: '',
                    elemConfig: {
                        type: 'day',
                    },
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    span: "three",
                    valid: false
                },
            },
    }

    inputChangedHandler = ( event, categoryName, controlName ) => {
        const updatedControls = {
                                    ...this.state[categoryName], 
                                    [controlName]: {
                                        ...this.state[categoryName][controlName], 
                                        value: event.target.value,
                                        valid: checkValidity(event.target.value, this.state[categoryName][controlName].validation)
                                    }
                                }
        this.setState({ [categoryName] : updatedControls })
    }
    inputFileChangedHandler = ( event, categoryName, controlName ) => {
        const updatedControls = {
            ...this.state[categoryName], 
            [controlName]: {
                ...this.state[categoryName][controlName], 
                value: event.target.value,
                file : event.target.files[0],
                valid: checkValidity(event.target.value, this.state[categoryName][controlName].validation)
            }
        }
        this.setState({ [categoryName] : updatedControls })
    }
    uploadFileService = (file, onUploadProgress) => {
        let formData = new FormData();
        const newUser = {
            firstName: this.state.formControls['firstName'].value,
            lastName: this.state.formControls['lastName'].value,
            email: this.state.formControls['email'].value,
            password: this.state.formControls['password'].value,
            year: this.state.formControls['year'].value,
            month: this.state.formControls['month'].value,
            day: this.state.formControls['day'].value,
        }
        
        formData.append("file", file);
        for(let i in newUser) {
            formData.append(i, newUser[i])
        }
        // console.log(formData)
        return axios.post("/users", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    };
    createAccHandler = (event) => {
        event.preventDefault();
        let error = '';
        let sendReq = true;
        for(let key in this.state.formControls) {
            if(key !== 'formConfig') {
                sendReq = sendReq && this.state.formControls[key].valid
            }
        }
        if(sendReq) {
            this.uploadFileService(this.state.formControls['file'].file, (event) => {
                // console.log(event)
                // setProgress(Math.round((100 * event.loaded) / event.total));
            })
            .then((response) => {
                // console.log(response.data);
                // setMessage(response.data.message);
                // return getFilesService();
            })
            // .then((files) => {
            //     setFileInfos(files.data);
            // })
            .catch(() => {
                // setProgress(0);
                // setMessage("Could not upload the file!");
                // setCurrentFile(undefined);
                error = 'Could not upload the file!';
            });
            // this.props.onCreateAcc(this.state.formControls.email.value, this.state.formControls.password.value)
            this.props.cancelNewAccount();
        }
        else
            error = 'Fill in the required fields correctly!';
         this.setState({submitMessage: error});
    }


    getFiles = () => {
        return axios.get("/files");
    };

    render() {
        let form = null;
        let formElements = [];

        // for(let j in this.state.formControls) {
        //     // console.log(this.state.formControls[j])
        //     formElements.push(<Input
        //         key={j}
        //         identifier={j}
        //         elementType={this.state.formControls[j].elemType}
        //         className={styles.input 
        //                     + (!this.state.formControls[j].valid ? ' ' + styles.inputInvalid : '')
        //                     + (this.state.formControls[j].span === 'half' ? ' ' + styles.inputSpanHalf : '')}
        //         elemConfig={this.state.formControls[j].elemConfig}
        //         value={this.state.formControls[j].value}
        //         onChange={(event) => this.inputChangedHandler(event, 'formControls', j)}
        //     />)
        // }

        formElements.push(<Input
            key={'firstName'}
            identifier={'firstName'}
            elementType={this.state.formControls['firstName'].elemType}
            className={styles.input 
                        + (!this.state.formControls['firstName'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['firstName'].span === 'half' ? ' ' + styles.inputSpanHalf : '')}
            elemConfig={this.state.formControls['firstName'].elemConfig}
            value={this.state.formControls['firstName'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'firstName')}
        />)
        formElements.push(<Input
            key={'lastName'}
            identifier={'lastName'}
            elementType={this.state.formControls['lastName'].elemType}
            className={styles.input 
                        + (!this.state.formControls['lastName'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['lastName'].span === 'half' ? ' ' + styles.inputSpanHalf : '')}
            elemConfig={this.state.formControls['lastName'].elemConfig}
            value={this.state.formControls['lastName'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'lastName')}
        />)
        formElements.push(<Input
            key={'email'}
            identifier={'email'}
            elementType={this.state.formControls['email'].elemType}
            className={styles.input 
                        + (!this.state.formControls['email'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['email'].span === 'half' ? ' ' + styles.inputSpanHalf : '')}
            elemConfig={this.state.formControls['email'].elemConfig}
            value={this.state.formControls['email'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'email')}
        />)
        formElements.push(<Input
            key={'password'}
            identifier={'password'}
            elementType={this.state.formControls['password'].elemType}
            className={styles.input 
                        + (!this.state.formControls['password'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['password'].span === 'half' ? ' ' + styles.inputSpanHalf : '')}
            elemConfig={this.state.formControls['password'].elemConfig}
            value={this.state.formControls['password'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'password')}
        />)
        
        formElements.push(<Input
            key={'file'}
            identifier={'file'}
            elementType={this.state.formControls['file'].elemType}
            className={styles.input 
                + (!this.state.formControls['file'].valid ? ' ' + styles.inputInvalid : '')
                // + (this.state.formControls['file'].span === 'half' ? ' ' + styles.inputSpanHalf : '')
            }
            elemConfig={this.state.formControls['file'].elemConfig}
            value={this.state.formControls['file'].value}
            onChange={(event) => this.inputFileChangedHandler(event, 'formControls', 'file')}
        />)

        formElements.push(this.state.formControls['file'].file !== null 
        && 
            <img 
            key={'img'}
                className={styles.avatar}
                src={URL.createObjectURL(this.state.formControls['file'].file)}
                alt={this.state.formControls['file'].value}
            />
        )

        formElements.push(<Input
            key={'year'}
            identifier={'year'}
            elementType={this.state.formControls['year'].elemType}
            className={styles.input 
                        + (!this.state.formControls['year'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['year'].span === 'three' ? ' ' + styles.inputSpanThree : '')}
            elemConfig={this.state.formControls['year'].elemConfig}
            value={this.state.formControls['year'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'year')}
        />)
        formElements.push(<Input
            key={'month'}
            identifier={'month'}
            elementType={this.state.formControls['month'].elemType}
            className={styles.input 
                        + (!this.state.formControls['month'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['month'].span === 'three' ? ' ' + styles.inputSpanThree : '')}
            elemConfig={this.state.formControls['month'].elemConfig}
            value={this.state.formControls['month'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'month')}
        />)
        formElements.push(<Input
            key={'day'}
            identifier={'day'}
            elementType={this.state.formControls['day'].elemType}
            className={styles.input 
                        + (!this.state.formControls['day'].valid ? ' ' + styles.inputInvalid : '')
                        + (this.state.formControls['day'].span === 'three' ? ' ' + styles.inputSpanThree : '')}
            elemConfig={this.state.formControls['day'].elemConfig}
            value={this.state.formControls['day'].value}
            onChange={(event) => this.inputChangedHandler(event, 'formControls', 'day')}
        />)
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
                    Create Account
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

export default CreateAccount;
