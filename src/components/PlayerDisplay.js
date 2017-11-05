import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "@/match";

class PlayerDisplay extends React.Component {

    update = (event) => {
        const id = event.target.getAttribute("data-value");
        if (!this.props.match.server) {
            this.props.dispatch(actions.server(id));
        } else {
            this.props.dispatch(actions.score(id));
        }
    }

    render = () => {
        const {id} = this.props;
        const player = this.props.match[id];

        return (
            <span>
                <button
                    data-value={id}
                    onClick={this.update}>
                    +
                </button>
                &nbsp; {player.points}
                &nbsp; {player.name}
                &nbsp; {this.props.match.server === id && <span>&lt;===</span>}
            </span>
        );
    }
}

PlayerDisplay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match
});

export default connect(mapStateToProps)(PlayerDisplay);
