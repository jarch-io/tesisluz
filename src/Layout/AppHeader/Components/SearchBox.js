import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import cx from 'classnames';

import {find as findRequest} from '../../../Services/Request';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false
        };
    }

    searchRequest(evt) {
        const {keyCode, currentTarget} = evt;

        if(keyCode == 13) {
            findRequest({
                code : currentTarget.value
            })
                .then(request => {
                    if(request) {
                        this.props.history.push(`/search/${request.id}`);
                    }
                });
        }
    }

    render() {
        return (
            <Fragment>
                <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })}>
                    <div className="input-holder">
                        <input type="text" className="search-input" placeholder="Ingrese el codigo de solicitud." onKeyUp={this.searchRequest.bind(this)}/>
                        <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})}
                                className="search-icon"><span/></button>
                    </div>
                    <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})} className="close"/>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(SearchBox);