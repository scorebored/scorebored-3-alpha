import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PlayerDisplay from "@/components/PlayerDisplay";

class Scoreboard extends React.Component {

    render = () => {
        return (
            <div>
                <ul>
                    <li><PlayerDisplay id="player0"/></li>
                    <li><PlayerDisplay id="player1"/></li>
                </ul>
                <Link to="/adjust">
                    <button>Adjust scores</button>
                </Link>
            </div>
        );
    }
}

Scoreboard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match
});

export default connect(mapStateToProps)(Scoreboard);





