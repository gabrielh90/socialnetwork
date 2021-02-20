import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './LogInPage.css';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import * as actions from '../../store/actions';
import LogInForm from '../../components/LogInForm/LogInForm';
import RecoverAccountForm from '../../components/RecoverAccountForm/RecoverAccountForm'
import CreateAccount from '../../components/CreateAccount';

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
}))(Button);

class LogInPage extends Component {
    state = {
        focusForm: 'LogInForm',
        addNewAccount: false
    }
    focusParent = (event, formName) => {
        this.setState({focusForm: formName})
    }
    cancelNewAccount = () => this.setState({addNewAccount: false})
    render() {
        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        
        return <div className={styles.rootPage}>
            {authRedirect}
            <div className={styles.helper}>
                <div className={styles.logo}>Facebook</div>
                Facebook - helps you connect and share with the people in your life.
            </div>
            <div className={styles.rootCard}>
                <LogInForm focusForm={this.state.focusForm} focusFormHandler={this.focusParent}/>
                <RecoverAccountForm focusForm={this.state.focusForm} focusFormHandler={this.focusParent}/>
                <hr className={styles.divider}/>
                <SingUpButton
                    variant="contained"
                    styles={{root: {color:'#F02849'}}}
                    fullWidth
                    onClick={() => this.setState({addNewAccount: true})}
                >
                    Create New Account
                </SingUpButton>
                {this.state.addNewAccount 
                    && 
                    <div className={styles.modal} onClick={() => this.setState({addNewAccount: false})}>
                        <CreateAccount cancelNewAccount={this.cancelNewAccount}/>
                    </div>
                }
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userIsAuthenticated,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        // onAuth: (email, pass) => dispatch( actions.passwordAuthRequest(email, pass)),
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(LogInPage);
