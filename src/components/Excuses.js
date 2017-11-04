import React from "react";
import {Link} from "react-router-dom";

class Excuses extends React.Component {
    render = () => {
        return (
            <div>
                <h3>Excuses</h3>
                <Link to="/">
                    <button>Back</button>
                </Link>
                <ul>
                    <li>Your shirt is white or orange, can&rsquo;t see the ball when
                        it&rsquo;s in front of your shirt</li>
                    <li>My back hurts</li>
                    <li>I let him win</li>
                    <li>The lighting was bad</li>
                    <li>I thought he was Jeff</li>
                    <li>I was practicing my swing and was not
                        playing serious</li>
                    <li>My wrist hurts</li>
                    <li>It is Tuesday</li>
                    <li>These balls are too big</li>
                    <li>I was blowing my thing</li>
                </ul>
            </div>
        );
    }
}

export default Excuses;
