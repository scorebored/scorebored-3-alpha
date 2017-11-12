import React from "react";
import PropTypes from "prop-types";

const AdjustPlayer = (props) => (
    <li>
        <input
            name={props.player.id}
            type="text"
            value={props.player.points}
            onChange={props.onScoreChange}
        />
        {props.player.name}
        <input
            name={props.player.id}
            type="checkbox"
            checked={props.player.server}
            onChange={props.onServerChange}
        />
        {props.player.error &&
            <b>&nbsp; Invalid</b>
        }
    </li>
);

AdjustPlayer.propTypes = {
    player: PropTypes.object.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onServerChange: PropTypes.func.isRequired,
};

export default AdjustPlayer;