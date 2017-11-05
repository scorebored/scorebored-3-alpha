import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import * as actions from "@/match";

class AdjustMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            points0: 0, 
            points1: 0,
        };
    }
    
    componentDidMount = () => {
        const {match} = this.props;
        this.setState({
            points0: match.player0.points,
            points1: match.player1.points,
        });
    }

    updatePoints0 = (event) => {
        this.setState({points0: event.target.value});
    }

    updatePoints1 = (event) => {
        this.setState({points1: event.target.value});
    }

    adjust = () => {
        this.props.dispatch(actions.adjustPoints([
            this.state.points0,
            this.state.points1
        ]));
        this.props.history.push("/display");
    }

    render = () => {
        const {match} = this.props;
        return (
            <div>
                <h3>Adjust Match</h3>
                <ul>
                    <li>
                        <input type="text" value={this.state.points0} 
                               onChange={this.updatePoints0} />
                        {match.player0.name}
                    </li>
                    <li>
                        <input type="text" value={this.state.points1} 
                               onChange={this.updatePoints1} />
                        {match.player1.name}
                    </li>
                </ul>
                <Link to="/display">
                    <button>Cancel</button>
                </Link>
                <button onClick={this.adjust}>Adjust</button>
            </div>
        );
    }
}

AdjustMatch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match
});

export default connect(mapStateToProps)(AdjustMatch);