import React from 'react'
import PropTypes from 'prop-types'

import {otherPlayer} from '../lib/player'
import AdjustPlayer from './AdjustPlayer'

class AdjustGame extends React.Component {

    componentWillMount = () => {
        this.setState({
            0: {
                id: 0,
                name: this.props.players[0].name,
                points: this.props.points[0],
                server: this.props.server === 0,
                error: false,
            },
            1: {
                id: 1,
                name: this.props.players[1].name,
                points: this.props.points[1],
                server: this.props.server === 1,
                error: false,
            },
        })
    }

    scoreChanged = (event) => {
        const playerId = event.target.name
        this.setState({
            [playerId]: {
                ...this.state[playerId],
                points: event.target.value,
                error: false,
            }
        })
    }

    serverChanged = (event) => {
        const playerId = event.target.name
        const otherId = otherPlayer(playerId)
        this.setState({
            [playerId]: {
                ...this.state[playerId],
                server: event.target.checked
            }
        })
        this.setState({
            [otherId]: {
                ...this.state[otherId],
                server: !event.target.checked,
            }
        })
    }

    adjust = () => {
        const [p0, err0] = this.validateScore(0)
        const [p1, err1] = this.validateScore(1)
        const server = this.state[0].server ? 0 : 1

        if (err0 || err1) {
            return
        }
        this.props.adjust({points: [p0, p1], server})
        this.props.done()
    }

    cancel = () => {
        this.props.done()
    }

    validateScore = (playerId) => {
        let p = Number.parseInt(this.state[playerId].points, 10)
        if (Number.isNaN(p) || p < 0 || p >= this.props.gameLength) {
            this.setState({
                [playerId]: {
                    ...this.state[playerId],
                    error: true
                }
            })
            return [0, true]
        }
        return [p, false]
    }

    render = () => {
        return (
            <div>
                <h3>Adjust Match</h3>
                <ul>
                    <AdjustPlayer
                        form={this.state[0]}
                        onScoreChange={this.scoreChanged}
                        onServerChange={this.serverChanged}
                    />
                    <AdjustPlayer
                        form={this.state[1]}
                        onScoreChange={this.scoreChanged}
                        onServerChange={this.serverChanged}
                    />
                </ul>
                <button onClick={this.cancel}>Cancel</button>
                <button onClick={this.adjust}>Adjust</button>
            </div>
        )
    }
}

export default AdjustGame

AdjustGame.propTypes = {
    players: PropTypes.array.isRequired,
    points: PropTypes.array.isRequired,
    server: PropTypes.number,
    gameLength: PropTypes.number.isRequired,

    adjust: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
}

