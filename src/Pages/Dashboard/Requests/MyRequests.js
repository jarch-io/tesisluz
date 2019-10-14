import React, {Fragment, useState} from 'react';
import classnames from 'classnames';

import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Row, Col, CardHeader, CardFooter,
    Card, CardBody,
    Button, ButtonGroup
} from 'reactstrap';

import NyRequestsList from '../../Elements/Requests/MyRequestsList';
import RequestsListUnsigned from '../../Elements/Requests/RequestsListUnsigned';

const ListElement = ({match}) => {
    const [tabActive, setTabActive] = useState(1);

    const toggleTab = (tab) => {
        setTabActive(tab);
    }

    return (
        <Fragment>
            <Card tabs="true" className="mb-3">
                <CardHeader>
                    <Nav justified>
                        <NavItem>
                            <NavLink
                                className={classnames({active: tabActive == 1})}
                                onClick={toggleTab.bind(this, 1)}
                            >
                                Mis peticiones
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: tabActive == 2})}
                                onClick={toggleTab.bind(this, 2)}
                            >
                                Otras peticiones
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: tabActive == 3})}
                                onClick={toggleTab.bind(this, 3)}
                            >
                                Historial
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardHeader>
                <CardBody>
                    <TabContent activeTab={tabActive}>
                        <TabPane tabId={1}>
                            <NyRequestsList />
                        </TabPane>
                        <TabPane tabId={2}>
                            <RequestsListUnsigned />
                        </TabPane>
                        <TabPane tabId={3}>
                            Historial
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </Fragment>
);
}

export default ListElement;