import React from "react";
import {Link} from "react-router-dom";

class MainMenu extends React.Component {

    render = () => {
        return (
            <div>
                <h3>Main Menu</h3>
                <img src={`${__dirname}/../resources/paddle.png`}/>
                <ul>
                    <li><Link to="/start">Start Match</Link></li>
                    <li><Link to="/excuses">Excuses</Link></li>
                </ul>
            </div>
        );
    }
}

export default MainMenu;
