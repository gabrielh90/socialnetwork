import React from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CustomAppBar from './CustomAppBar';
import ProfilePage from './ProfilePage';
import AppLayout from './AppLayout/AppLayout'
import LogInPage from './LogInPage/LogInPage'
import Spinner from './../components/Spinner'
import * as actions from './../store/actions'
import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from './../shared/axios-base'

function App(props) {
    useEffect(() => {
            props.onTryAutoSignup(props.history.location.pathname);
            const requestInterceptor = axios.interceptors.request.use( req => {
                if (props.token !== '') {
                    req.headers['Authorization'] = 'Bearer ' + props.token;
                    // if (req.data.constructor.name === 'FormData') {
                    //     req.data.append('token', props.token);
                    // } else {
                    //     req.data = { ...req.data, token: props.token}
                    // }
                }
                console.log(req);
                return req;
            } );
            const responseInterceptor = axios.interceptors.response.use(
                res => {
                    console.log(res);
                    return res
                },
                error => {
                    console.log(error);
                    return Promise.reject(error);
                } );

            return () => {
                axios.interceptors.request.eject( requestInterceptor );
                axios.interceptors.response.eject( responseInterceptor );
            }
            },[])

    const NavigationRoutes = () => {
        
        // console.log(token); //when is not innexistent is null
        // console.log(email); //when is not innexistent is null
        // console.log(props.history.location.pathname); //when is not innexistent is null

        // let routes = (<Route path='/' component={AppLayout}></Route>);
        let routes = (
            <Switch>
                <Route path='/' component={Spinner}></Route>
            </Switch>
        )
        if(props.token === '' && props.history.location.pathname === '/') {
            routes = (
                <Route path='/' component={LogInPage}></Route>
            )
        }
        if(props.userIsNotAuthenticated === true) {
            routes = (
                <Switch>
                    <Route path='/recover/:id' component={RecoverPassword}></Route>
                    <Route path='/groups/:id' component={AppLayout}></Route>
                    {/* <Route path='/:id' component={AppLayout}></Route> */}
                    <Route path='/' component={LogInPage}></Route>
                    <Redirect to='/' />
                </Switch>
            )
        }
        if(props.userIsAuthenticated === true) {
            routes = (
                <>
                {/* <Route path='/' component={CustomAppBar}></Route> */}
                <Route path='/' render={(props) => (<CustomAppBar {...props}/>)}/>
                <Switch>
                    <Route path='/groups/:id' component={AppLayout}></Route>
                    <Route path='/:id' component={ProfilePage}></Route>
                    {/* <Route path='/:id' render={(props) => (<ProfilePage userProfile={userProfile} {...props}/>)}></Route> */}
                    <Route path='/' component={AppLayout}></Route>
                    <Redirect to='/' />
                </Switch>
                </>
            )
        }
        return routes
    }
    return <NavigationRoutes/>
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userIsNotAuthenticated: state.auth.userIsNotAuthenticated,
        userIsAuthenticated: state.auth.userIsAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: (url) => dispatch(actions.tokenAuthRequest(url))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
