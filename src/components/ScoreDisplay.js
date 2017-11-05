import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as actions from "@/match";

class ScoreDisplay extends React.Component {

    scorePlayer0 = () => {
        this.props.dispatch(actions.score("player0"));
    }

    scorePlayer1 = () => {
        this.props.dispatch(actions.score("player1"));
    }

    render = () => {
        const {match} = this.props;
        return (
            <div>
                <ul>
                    <li>
                        <button onClick={this.scorePlayer0}>+</button>
                        &nbsp;
                        {match.player0.points}
                        &nbsp;
                        {match.player0.name}
                    </li>
                    <li>
                        <button onClick={this.scorePlayer1}>+</button>
                        &nbsp;
                        {match.player1.points}
                        &nbsp;
                        {match.player1.name}
                    </li>
                </ul>
            </div>
        );
    }
}

ScoreDisplay.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match
});

export default connect(mapStateToProps)(ScoreDisplay);