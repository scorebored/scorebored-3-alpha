import React from "react";
import PropTypes from "prop-types";

import {otherPlayer} from "@/util/player";
import AdjustPlayer from "@/components/AdjustPlayer";

class AdjustGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player0: {points: 0, server: false},
            player1: {points: 0, server: false},
        };
    }

    componentDidMount = () => {
        const init = (player) => {
            this.setState({
                [player]: {
                    ...this.props[player],
                    error: false
                }
            });
        };
        init("player0");
        init("player1");
    }

    scoreChanged = (event) => {
        const player = event.target.name;
        this.setState({
            [player]: {
                ...this.state[player],
                points: event.target.value,
                error: false,
            }
        });
    }

    serverChanged = (event) => {
        const id = event.target.name;
        const other = otherPlayer(id);
        this.setState({
            [id]: {
                ...this.state[id],
                server: event.target.checked
            }
        });
        if (event.target.checked) {
            this.setState({
                [other]: {
                    ...this.state[other],
                    server: false,
                }
            });
        }
    }

    adjust = () => {
        const [p0, err0] = this.validateScore("player0");
        const [p1, err1] = this.validateScore("player1");

        if (err0 || err1) {
            return;
        }
        this.props.adjustScore(p0, p1);
        this.props.done();
    }

    cancel = () => {
        this.props.done();
    }

    validateScore = (player) => {
        let p = Number.parseInt(this.state[player].points, 10);
        if (Number.isNaN(p) || p < 0 || p >= this.props.gameLength) {
            this.setState({
                [player]: {
                    ...this.state[player],
                    error: true
                }
            });
            return [0, true];
        }
        return [p, false];
    }

    render = () => {
        return (
            <div>
                <h3>Adjust Match</h3>
                <ul>
                    <AdjustPlayer
                        player={this.state.player0}
                        onScoreChange={this.scoreChanged}
                        onServerChange={this.serverChanged}
                    />
                    <AdjustPlayer
                        player={this.state.player1}
                        onScoreChange={this.scoreChanged}
                        onServerChange={this.serverChanged}
                    />
                </ul>
                <button onClick={this.cancel}>Cancel</button>
                <button onClick={this.adjust}>Adjust</button>
            </div>
        );
    }
}

export default AdjustGame;

AdjustGame.propTypes = {
    player0: PropTypes.object.isRequired,
    player1: PropTypes.object.isRequired,
    gameLength: PropTypes.number.isRequired,

    adjustScore: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
};

