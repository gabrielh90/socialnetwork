import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './RecoverAccountForm.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors';
import * as actions from '../../store/actions'
import {checkValidity} from '../../shared/utility'
import axios from 'axios'

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
                    placeholder: 'Email address or phone number'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    isEmail: true
                },
                valid: false
            },
        },

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
    recoverAccountSubmitHandler = (event) => {
        event.preventDefault()
        let error = '';
        let sendReq = true;
        for(let key in this.state.formControls) {
            if(key !== 'formConfig') {
                    sendReq = sendReq && this.state.formControls[key].valid
            }
        }
        if(sendReq)
            this.requestRecoverAcc(this.state.formControls.email.value)
        else
            error = 'Fill in the email!';
        this.setState({submitMessage: error});
    }

    requestRecoverAcc = (email) => {
        axios.post('http://localhost:5000/recover/', {username: email})
            .then(res => {
                // if(res.data.found === 'true') {
                //     const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                //     localStorage.setItem('token',  res.data.token)
                //     localStorage.setItem('username', res.data.username)
                //     localStorage.setItem('expirationDate', expirationDate)
                //     dispatch(authSuccess(res.data.token, res.data.username));
                //     dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
                // } else {
                //     console.log(res.data.error)
                //     dispatch(authFail(res.data.error));
                // }
            })
            .catch(err => {
                // dispatch(authFail(err.response.data.error))
            })
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
                className={styles.input + (!this.state.formControls[j].valid ? ' ' + styles.inputInvalid : '')} 
                type={this.state.formControls[j].elemConfig.type}
                placeholder={this.state.formControls[j].elemConfig.placeholder}
                onChange={(event) => this.inputChangedHandler(event, 'formControls', j)}
                onFocus={(event) => this.props.focusFormHandler(event, 'RecoverAccountForm')}
            />)
        }
                
        form =
            <form 
                onSubmit={this.state.formControls.formConfig.onSubmit}
                className={styles.rootForm + (this.props.focusForm !== 'RecoverAccountForm' ?  ' ' + styles.smallSizeForm : '') }
            >
                <div className={styles.loginError}>
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
        onAuth: (email, pass) => dispatch( actions.authRequest(email, pass)),
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(RecoverAccountForm);
