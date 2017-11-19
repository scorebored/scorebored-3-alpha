import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import PlayerDisplay from '@/components/PlayerDisplay'

export default class Scoreboard extends React.Component {

    componentDidMount = () => {
        window.addEventListener('keyup', this.keyPressed)
    }

    componentWillUnmount = () => {
        window.removeEventListener('keyup', this.keyPressed)
    }

    render = () => {
        return (
            <div className='page'>
                <ul>
                    <li><PlayerDisplay
                            name={this.props.players[0].name}
                            points={this.props.points[0]}
                            serving={this.props.server === 0}/>
                    </li>
                    <li><PlayerDisplay
                            name={this.props.players[1].name}
                            points={this.props.points[1]}
                            serving={this.props.server === 1}/>
                    </li>
                </ul>
                <Link to='/adjust'>
                    <button>Adjust scores</button>
                </Link>
            </div>
        )
    }

    keyPressed = (event) => {
        if (event.key === 'ArrowLeft') {
            this.update(0)
        }
        if (event.key === 'ArrowRight') {
            this.update(1)
        }
    }

    update = (playerId) => {
        if (this.props.server !== null) {
            this.props.awardPoint(playerId)
        } else {
            this.props.firstServer(playerId)
        }
    }
}

Scoreboard.propTypes = {
    players: PropTypes.array.isRequired,
    points: PropTypes.array.isRequired,
    server: PropTypes.number,

    awardPoint: PropTypes.func.isRequired,
    firstServer: PropTypes.func.isRequired,
}
