import React from 'react'
import PropTypes from 'prop-types'

const PlayerDisplay = (props) => {
    return (
        <span>
            &nbsp; {props.points}
            &nbsp; {props.name}
            &nbsp; {props.serving && <span>&lt;===</span>}
        </span>
    )
}

PlayerDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    serving: PropTypes.bool,
}

export default PlayerDisplay