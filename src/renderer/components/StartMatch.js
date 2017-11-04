import React from "react";
import { Link } from "react-router-dom";

class NewGame extends React.Component {
    render = () => {
        return (
            <div>
                <h3>Start Match</h3>
                <Link to="/">
                    <button>Back</button>
                </Link>
                <br/>
                <br/>
                Some fields go here
            </div>
        );
    }
}

export default NewGame;
