import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'

const matColor = '#eee'

const styleMenu = {
    backgroundColor: matColor,
    borderRadius: 10,
    height: 300,
    width: 300,
    padding: 15
}

const styleSpace = {
    marginLeft: 10,
    marginRight: 10
}

const centerHeader = {
    textAlign: 'center'
}

class MatchSettings extends React.Component {

    gameLengthChanged = (event) => {
        const value = parseInt(event.target.value, 10)
        this.props.setGameLength(value)
    }

    matchLengthChanged = (event) => {
        const value = parseInt(event.target.value, 10)
        this.props.setMatchLength(value)
    }

    render = () => {
        return (
            <div className='center_shit'>
                <div style={styleMenu}>
                    <h3 style={centerHeader} >Match Settings</h3>
                    <label style={styleSpace} htmlFor='game_length'>
                        Game Length
                    </label>
                    <select className='drop_down' id='game_length'
                         title='game_length'
                         value={this.props.gameLength.toString()}
                         onChange={this.gameLengthChanged}>
                        <option value='11'>11</option>
                        <option value='21'>21</option>
                    </select>
                    <label style={styleSpace} htmlFor='match_length'>
                        Match Length
                    </label>
                    <select id='match_length'
                        title='match_length'
                        value={this.props.length.toString()}
                        onChange={this.matchLengthChanged}>
                        <option value='1'>Single</option>
                        <option value='3'>2 out of 3</option>
                        <option value='5'>3 out of 5</option>
                        <option value='7'>4 out of 7</option>
                    </select><br/>
                    <Link to='/'>
                        <button>Cancel</button>
                    </Link>
                    <br/>
                    <br/>
                    Some fields go here
                    <br/>
                    <Link to='/scoreboard'>
                        <Button bsStyle='primary'>Show me the scores</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

MatchSettings.propTypes = {
    length: PropTypes.number.isRequired,
    gameLength: PropTypes.number.isRequired,
    setGameLength: PropTypes.func.isRequired,
    setMatchLength: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired
}

export default MatchSettings
