import React, {Fragment} from 'react';

import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getUser, getAuthPending, getAuthError, getIsAuthorize} from '../../../reducers/Auth';
import {logoutAuth as logoutAuthAction} from '../../../Fetchs/Auth';

import {
    faCalendarAlt,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    onLogout() {
        const {logout} = this.props;

        logout();
    }


    render() {
        const {isAuthorize, user} = this.props;

        if(!isAuthorize) return '';

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {user.person ? `${user.person.firstname} ${user.person.lastname}` : ''}
                                </div>
                                <div className="widget-subheading">
                                    {user.position && user.position.name}
                                </div>
                            </div>
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        {/*<img width={42} className="rounded-circle" src={avatar1} alt=""/>*/}
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            {/**<NavItem className="nav-item-header">
                                                Activity
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);">
                                                    Requests
                                                    <div className="ml-auto badge badge-pill badge-info">8</div>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);">Recover Password</NavLink>
                                            </NavItem>
                                            <NavItem className="nav-item-header">
                                                My Account
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);">
                                                    Settings
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);">
                                                    Messages
                                                    <div className="ml-auto badge badge-warning">512</div>
                                                </NavLink>
                                            </NavItem>*/}
                                            <NavItem className="nav-item-header">
                                                Cuenta
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);" onClick={this.onLogout.bind(this)}>
                                                    Logout
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    error : getAuthError(state),
    user : getUser(state),
    isAuthorize : getIsAuthorize(state),
    pending : getAuthPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout : logoutAuthAction
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBox);