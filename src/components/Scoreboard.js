import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import PlayerDisplay from '@/components/PlayerDisplay';

export default class Scoreboard extends React.Component {

    componentDidMount = () => {
        window.addEventListener('keyup', this.keyPressed);
    }

    componentWillUnmount = () => {
        window.removeEventListener('keyup', this.keyPressed);
    }

    render = () => {
        return (
            <div className='page'>
                <ul>
                    <li><PlayerDisplay player={this.props.player0} /></li>
                    <li><PlayerDisplay player={this.props.player1} /></li>
                </ul>
                <Link to='/adjust'>
                    <button>Adjust scores</button>
                </Link>
            </div>
        );
    }

    keyPressed = (event) => {
        if (event.key === 'ArrowLeft') {
            this.update('player0');
        }
        if (event.key === 'ArrowRight') {
            this.update('player1');
        }
    }

    update = (player) => {
        const hasServer = (
            this.props.player0.server ||
            this.props.player1.server
        );
        if (hasServer) {
            this.props.awardPoint(player);
        } else {
            this.props.setServer(player);
        }
    }
}

Scoreboard.propTypes = {
    player0: PropTypes.object.isRequired,
    player1: PropTypes.object.isRequired,
    awardPoint: PropTypes.func.isRequired,
    setServer: PropTypes.func.isRequired,
};
