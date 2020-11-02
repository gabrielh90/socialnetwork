import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import AppLayout from './AppLayout/AppLayout'
import LogInPage from './LogInPage/LogInPage'
import * as actions from './../store/actions'

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/' component={LogInPage}></Route>
            </Switch>
        )
        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path='/' component={AppLayout}></Route>
                </Switch>
            )   
        }

        return <>{routes}</>
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
