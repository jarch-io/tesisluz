import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {fetchAuth as fetchAuthAction} from '../../Fetchs/Auth';
import {getUser, getAuthPending, getAuthError, getIsAuthorize} from '../../reducers/Auth';

import {
    ToastContainer,
} from 'react-toastify';

const Login = lazy(() => import('../../Pages/Auth'));
const Dashboard = lazy(() => import('../../Pages/Dashboard'));
const Customer = lazy(() => import('../../Pages/Customer'));

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthorize} = this.props;
        return (
            <Route 
                {...this.props}
                render = {innerProps => isAuthorize ? <Dashboard {...this.props} /> : <Redirect to="/login" />}
            />
        );
    }
}

const mapStateToProps = state => ({
    error : getAuthError(state),
    user : getUser(state),
    isAuthorize : getIsAuthorize(state),
    pending : getAuthPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAuth : fetchAuthAction
}, dispatch)

const PrivateComponent = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute));

const AppMain = () => {

    return (
        <Fragment>

            {/* Components */}

            {/*Login*/}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Login
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/dashboard" component={PrivateComponent}/>
                    {/*<PrivateRoute path="/dashboard" component={PrivateRoute} />*/}
                </Switch>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Login
                            <small>Because this is a demonstration we load at once all the Forms examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/" component={Customer}/>
            </Suspense>
            
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;