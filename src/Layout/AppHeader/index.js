import React, {Fragment} from 'react';
import cx from 'classnames';

import SearchBox from './Components/SearchBox';
import UserBox from './Components/UserBox';

class Header extends React.Component {
    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <div className="app-header-left">
                    {/*<SearchBox/>*/}
                </div>
                <div className="app-header-right">
                    <UserBox/>
                </div>
            </Fragment>
        );
    }
}

export default Header;