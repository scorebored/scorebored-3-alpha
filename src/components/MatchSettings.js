import React from "react";
import {Link} from "react-router-dom";

class MatchSettings extends React.Component {
    render = () => {
        return (
            <div>
                <h3>Match Settings</h3>
                <Link to="/">
                    <button>Back</button>
                </Link>
                <br/>
                <br/>
                Some fields go here
                <br/>
                <Link to="/display">
                    <button>Show me the scores</button>
                </Link>
            </div>
        );
    }
}

export default MatchSettings;
