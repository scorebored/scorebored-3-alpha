import React from "react";
import {Link} from "react-router-dom";
import { Navbar, Jumbotron, Button, DropdownButton, MenuItem } from 'react-bootstrap';

class MatchSettings extends React.Component {
    render = () => {
        return (
            <div className="center_shit">
                <h3>Match Settings</h3>
                <label htmlFor="game_length">
                    Game Length
                    <DropdownButton className='drop_down' id='game_length' title='game_length'>
                        <MenuItem>21</MenuItem>
                        <MenuItem>11</MenuItem>
                    </DropdownButton>
                </label>
                <label htmlFor="match_length">
                    Match Length
                    <DropdownButton id='match_length' title='match_length'>
                        <MenuItem>Single</MenuItem>
                        <MenuItem>2 out of 3</MenuItem>
                        <MenuItem>3 out of 5</MenuItem>
                        <MenuItem>4 out of 7</MenuItem>
                    </DropdownButton>
                </label>
                <Link to="/">
                    <button>Cancel</button>
                </Link>
                <br/>
                <br/>
                Some fields go here
                <br/>
                <Link to="/scoreboard">
                    <Button bsStyle="primary">Show me the scores</Button>
                </Link>
            </div>
        );
    }
}

export default MatchSettings;
