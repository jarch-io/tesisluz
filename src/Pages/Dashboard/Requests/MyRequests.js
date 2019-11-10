import React, {Fragment, useState} from 'react';
import classnames from 'classnames';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {getUser} from '../../../reducers/Auth';

import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Row, Col, CardHeader, CardFooter,
    Card, CardBody,
    Button, ButtonGroup
} from 'reactstrap';

import NyRequestsList from '../../Elements/Requests/MyRequestsList';
import RequestsListUnsigned from '../../Elements/Requests/RequestsListUnsigned';

class ListElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabActive : undefined
        };
    }

    componentDidMount() {
        const {tabActive} = this.state;
        const {user} = this.props;

        if(tabActive == undefined && user != undefined) {
            this.setState({
                tabActive : user.position.name == "Supervisor" ? 2 : 1
            });
        }
    }

    toggleTab(tab) {
        this.setState({
            tabActive : tab
        });
    }

    render() {
        const {tabActive} = this.state;
        const {user} = this.props;
        const {name} = user.position;
        
        return (
            <Fragment>
                <Card tabs="true" className="mb-3">
                    <CardHeader>
                        <Nav>
                            {
                                name == "Supervisor" ? '' :
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: tabActive == 1})}
                                        onClick={this.toggleTab.bind(this, 1)}
                                    >
                                        Mis peticiones
                                    </NavLink>
                                </NavItem>
                            }
                            {
                                name == "Supervisor" ? 
                                <NavItem>
                                    <NavLink
                                        className={classnames({active: tabActive == 2})}
                                        onClick={this.toggleTab.bind(this, 2)}
                                    >
                                        Solicitudes sin asignar
                                    </NavLink>
                                </NavItem> : ''
                            }
                            {/*<NavItem>
                                <NavLink
                                    className={classnames({active: tabActive == 3})}
                                    onClick={this.toggleTab.bind(this, 3)}
                                >
                                    Historial
                                </NavLink>
                            </NavItem>*/}
                        </Nav>
                    </CardHeader>
                    <CardBody>
                        <TabContent activeTab={tabActive}>
                            {
                                name == "Supervisor" ? '' :
                                <TabPane tabId={1}>
                                    <NyRequestsList />
                                </TabPane>
                            }
                            {
                                name == 'Supervisor' ? 
                                <TabPane tabId={2}>
                                    <RequestsListUnsigned />
                                </TabPane>
                                : ''
                            }
                            {/*<TabPane tabId={3}>
                                Historial
                            </TabPane>*/}
                        </TabContent>
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user : getUser(state)
});

export default connect(
    mapStateToProps,
    {}
)(ListElement);