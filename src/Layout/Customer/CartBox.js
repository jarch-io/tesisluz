import React, {Fragment} from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import {fetchCart as fetchCartAction} from '../../Fetchs/Cart';
import {getCart, getCartError, getCartPending} from '../../reducers/Cart';

import './cartBox.css';

import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faShoppingCart,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class CartBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            total : 0,
            id : undefined
        };
    }

    componentWillMount() {
        const {fetchCart} = this.props;
        fetchCart();
    }

    goToCheckout() {
        this.props.history.push('/checkout');
    }

    goToHome() {
        this.props.history.push('/');
    }

    render() {
        const {pathname} = this.props.location;

        if(pathname == '/checkout') return '';

        const {cart} = this.props;

        let total = 0;

        if(cart) {
            cart.items.map((service) => {
                total += service.price * service.quantity
            });
        }

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <button className="mb-2 mr-2 btn-icon btn-icon-only btn btn-sm">
                                            <FontAwesomeIcon className="mr-2 lnr-map btn-icon-wrapper" icon={faShoppingCart} size="2x"/>
                                            <span className="badge badge-pill badge-primary">{cart ? cart.items.length : 0}</span>
                                        </button>
                                    </DropdownToggle>
                                    <DropdownMenu right className={classnames({"cart-items" : cart && cart.items.length > 0, 'rm-pointers' : true, 'dropdown-menu-lg' : true})}>
                                        <Nav vertical>
                                            <NavItem className="nav-item-header">
                                                Mi carrito
                                            </NavItem>
                                            {
                                                cart && cart.items.length > 0 ? <NavItem>
                                                <NavLink>
                                                    <Button block color="dark" onClick={this.goToCheckout.bind(this)}>
                                                        Solicitar S/ {total.toFixed(2)}
                                                    </Button>
                                                </NavLink>
                                            </NavItem> : ''
                                            }
                                            {
                                                cart && cart.items.length > 0 ? cart.items.map((service, idx) => {
                                                    return (
                                                        <NavItem>
                                                            <NavLink>
                                                                <img width={42} className="" src={service.image}/>
                                                                {service.title}
                                                                <div className="ml-auto badge badge-pill badge-info">S/ {service.price.toFixed(2)}</div>
                                                            </NavLink>
                                                        </NavItem>
                                                        );
                                                }) : <NavItem><NavLink><Button color="dark" onClick={this.goToHome.bind(this)}>Agregue servicios a su carrito</Button></NavLink></NavItem>
                                            }
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
    error : getCartError(state),
    cart : getCart(state),
    pending : getCartPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCart : fetchCartAction
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CartBox));