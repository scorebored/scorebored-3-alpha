import React from 'react';
import {Link} from 'react-router-dom';
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';

var tableStyle = {
    border: 'none',
    margin: '0 5%'
};

var roundCorners = {
    borderRadius: '10px'
};

let center_jacob = {
    margin: '0 10px'
};
class MainMenu extends React.Component {

    render = () => {
        return (
            <div className='page'>
                <div className='center_shit'>
                    <div>
                        <img src={`${__dirname}/../resources/S2_ping_pong.png`}/>
                    </div>
                    <table style={tableStyle}>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='form-horizontal give_me_space'>
                                        <label className='control-label' htmlFor='startMatch'>
                                            New Match
                                        </label>
                                        <div>
                                            <Link id='startMatch' to='/start'>
                                                <img src={`${__dirname}/../resources/paddle-transparent.png`}/>
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='form-horizontal give_me_space'>
                                        <label  style={center_jacob} className='control-label'
                                        htmlFor='j_excuses'>
                                            Excuses
                                        </label>
                                        <div>
                                            <Link id='j_excuses' to='/excuses'>
                                                <img style={roundCorners}
                                                src={`${__dirname}/../resources/jacob.png`}/>
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/*
                <Button bsSize='large' bsStyle='link'>
                    <Link to='/excuses'>Excuses
                    </Link>
                </Button>*/}
            </div>
        );
    }
}

export default MainMenu;
