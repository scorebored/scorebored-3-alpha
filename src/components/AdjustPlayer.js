import React from 'react'
import PropTypes from 'prop-types'

const AdjustPlayer = (props) => (
    <li>
        <input
            name={props.form.id}
            type='text'
            value={props.form.points}
            onChange={props.onScoreChange}
        />
        {props.form.name}
        <input
            name={props.form.id}
            type='checkbox'
            checked={props.form.server}
            onChange={props.onServerChange}
        />
        {props.form.error &&
            <b>&nbsp; Invalid</b>
        }
    </li>
)

AdjustPlayer.propTypes = {
    form: PropTypes.object.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onServerChange: PropTypes.func.isRequired,
}

export default AdjustPlayer