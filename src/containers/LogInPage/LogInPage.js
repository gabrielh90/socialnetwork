import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import styles from './LogInPage.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { green, blue } from '@material-ui/core/colors';
import {NavLink} from 'react-router-dom'
import * as actions from '../../store/actions'


const LogInButton = withStyles((theme) => ({
    root: {
        color: '#FFF',
        backgroundColor: 'var(--blue)',
        '&:hover': {
            backgroundColor: blue[900],
        },
        padding: '14px 16px',
        borderRadius: '10px',
        fontSize: '18px',
        maxHeight: '48px',
        textTransform: 'none',
        marginBottom: '12px',
    },
}))(Button)

const SingUpButton = withStyles((theme) => ({
    root: {
        color: '#FFF',
        backgroundColor: 'var(--green)',
        '&:hover': {
            backgroundColor: green[900],
        },
        padding: '14px 16px',
        borderRadius: '10px',
        fontSize: '18px',
        maxHeight: '48px',
        textTransform: 'none',
        width: 'auto',
        margin: 'auto',
        marginTop: '12px',
        marginBottom: '12px',
    }
}))(Button)

class LogInPage extends Component {
    state = {
        controls: {
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
    }

    inputChangedHandler  = ( event, controlName) => {
        // console.log(event.target.value + ' ' + controlName)
        const updatedControls = {...this.state.controls, 
                                        [controlName]: {
                                            ...this.state.controls[controlName], 
                                            value: event.target.value
                                        }
                                }
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault()
       // console.log(this.state.controls)
       this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
    }

    render() {
        let authRedirect = null;
        if(!authRedirect) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }
        return <div className={styles.rootPage}>
            {authRedirect}
        <div className={styles.helper}>
            <div className={styles.logo}>Facebook</div>
            Facebook helps you connect and share with the people in your life.
        </div>
        <div className={styles.rootCard}>
            <form 
                onSubmit={this.submitHandler}
                className={styles.rootForm}>
                <input 
                    className={styles.input} 
                    placeholder='Email address or phone number'
                    onChange={(event) => this.inputChangedHandler(event, 'email')}
                />
                <input
                    className={styles.input}
                    type='password' 
                    placeholder='Password'
                    onChange={(event) => this.inputChangedHandler(event, 'password')}
                />
                <LogInButton
                    type='submit'
                    variant="contained"
                >
                    Log In
                </LogInButton>
            </form>
            <NavLink 
                to='/login'
                className={styles.navLink}
            >   
                Forgotten password?
            </NavLink>
            <hr className={styles.divider}/>
            <SingUpButton
                variant="contained"
                styles={{root: {color:'#F02849'}}}
                fullWidth
            >
                Create New Account
            </SingUpButton>
        </div>
    </div>
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirectPath
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        onAuth: (email, pass) => dispatch( actions.authRequest(email, pass))
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(LogInPage);
