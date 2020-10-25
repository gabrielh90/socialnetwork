import React from 'react'
import styles from './LogInPage.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import { green, blue } from '@material-ui/core/colors';
import {NavLink} from 'react-router-dom'

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
    }
}))(Button)
const LogInPage = () => {
    return <div className={styles.rootPage}>
        <div className={styles.helper}>
            <div className={styles.logo}>Facebook</div>
            Facebook helps you connect and share with the people in your life.
        </div>
        <div className={styles.rootCard}>
            <input 
                className={styles.input} 
                placeholder='Email address or phone number'
            />
            <input
                className={styles.input} 
                type='password' 
                placeholder='Password'
            />
            <LogInButton
                variant="contained"

            >
                Log In
            </LogInButton>
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

export default LogInPage;