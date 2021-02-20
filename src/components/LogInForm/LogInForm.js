import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './LogInForm.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors';
import * as actions from '../../store/actions'
import {checkValidity} from '../../shared/formValidation'
import { withRouter } from 'react-router-dom'

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


class LogInForm extends Component {
    state = {
            submitMessage: '',
            formControls: {
                formConfig: {
                    onSubmit: (event) => this.loginSubmitHandler(event),
                    errorSubmitMessage: ''
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
                    valid: false,
                    touched: false,
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
                    valid: false,
                    touched: false
                }
            },
        }
    
    inputChangedHandler  = ( event, categoryName, controlName ) => {
        event.preventDefault();
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
    focusInputHandler = (event, categoryName, controlName ) => {
        event.preventDefault()
        if(this.props.focusForm !== 'LogInForm'){
            this.props.focusFormHandler(event, 'LogInForm');
        }
        const updatedControls = {
            ...this.state[categoryName], 
            [controlName]: {
                ...this.state[categoryName][controlName], 
                touched: true,
            }
        }
        this.setState({ [categoryName] : updatedControls })
    }
    loginSubmitHandler = (event) => {
        event.preventDefault();
        let error = '';
        let sendReq = true;
        for(let key in this.state.formControls) {
            if(key !== 'formConfig') {
                sendReq = sendReq && this.state.formControls[key].valid
            }
        }
        if(sendReq)
            this.props.onAuth(this.state.formControls.email.value, 
                              this.state.formControls.password.value,
                              this.props.history.location.pathname
                              )
        else
            error = 'Fill in the required fields correctly!';
        this.setState({submitMessage: error});
    }

    render() {
        let form = null;
        let formElements = [];
        
        for(let j in this.state.formControls) {
            if(j === 'formConfig'){
                continue;
            }
            // console.log(this.state.formControls[j])
            formElements.push(<input
                key={j}
                className={styles.input + ' ' + 
                            (!this.state.formControls[j].valid && this.state.formControls[j].touched === true
                                    ? styles.inputInvalid : '')}
                type={this.state.formControls[j].elemConfig.type}
                placeholder={this.state.formControls[j].elemConfig.placeholder}
                onChange={(event) => this.inputChangedHandler(event, 'formControls', j)}
                onFocus={(event) => this.focusInputHandler(event, 'formControls', j)}
            />)
        }
                
        form =
            <form
                onSubmit={ this.state.formControls.formConfig.onSubmit }
                className={styles.rootForm + (this.props.focusForm !== 'LogInForm' ?  ' ' + styles.smallSizeForm : '') }
            >
                
                <div className={styles.loginError}>
                    {this.props.loginError}
                    {this.state.submitMessage}
                </div>
                
                {formElements}
                <SubmitButton
                    type='submit'
                    variant="contained"
                >
                    Log In
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
        onAuth: (email, pass, url) => dispatch( actions.passwordAuthRequest(email, pass, url)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(LogInForm));
