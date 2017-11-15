import React from 'react';
import PropTypes from 'prop-types';

const PlayerDisplay = (props) => {
    const {player} = props;
    return (
        <span>
            &nbsp; {player.points}
            &nbsp; {player.name}
            &nbsp; {player.server && <span>&lt;===</span>}
        </span>
    );
};

PlayerDisplay.propTypes = {
    player: PropTypes.object.isRequired
};

export default PlayerDisplay;