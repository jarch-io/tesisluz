import React, {Fragment} from 'react';
import classnames from 'classnames';

import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Row, Col, CardHeader, CardFooter,
    Card, CardBody,
    Button, ButtonGroup
} from 'reactstrap';

import NyRequestsList from '../../Elements/Requests/MyRequestsList';

const ListElement = ({match}) => (
	<Fragment>
        <Card tabs="true" className="mb-3">
            <CardHeader>
                <Nav justified>
                    <NavItem>
                        <NavLink href="javascript:void(0);"
                                 className={classnames({active: true})}
                                 /*onClick={() => {
                                     this.toggle('1');
                                 }}*/
                        >
                            Mis peticiones
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="javascript:void(0);"
                                 className={classnames({active: false})}
                        >
                            Otras peticiones
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="javascript:void(0);"
                                 className={classnames({active: false})}
                        >
                            Historial
                        </NavLink>
                    </NavItem>
                </Nav>
            </CardHeader>
            <CardBody>
                <TabContent activeTab={'1'}>
                    <TabPane tabId="1">
                        <NyRequestsList />
                    </TabPane>
                    <TabPane tabId="2">
                        
                    </TabPane>
                    <TabPane tabId="3">
                        
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>
    </Fragment>
);

export default ListElement;