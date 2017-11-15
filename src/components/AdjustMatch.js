import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as actions from '@/match'

class AdjustMatch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            points0: 0,
            points1: 0,
            errorPoints0: false,
            errorPoints1: false,
        }
    }

    componentDidMount = () => {
        const {match} = this.props
        this.setState({
            points0: match.player0.points,
            points1: match.player1.points,
        })
    }

    updatePoints0 = (event) => {
        this.setState({
            points0: event.target.value,
            errorPoints0: false,
        })
    }

    updatePoints1 = (event) => {
        this.setState({
            points1: event.target.value,
            errorPoints1: false,
        })
    }

    adjust = () => {
        var {match} = this.props
        var error = false

        let p0 = Number.parseInt(this.state.points0, 10)
        let p1 = Number.parseInt(this.state.points1, 10)

        if (Number.isNaN(p0) || p0 < 0 || p0 > match.gameLength) {
            error = true
            this.setState({errorPoints0: true})
        }
        if (Number.isNaN(p1) || p1 < 0 || p1 > match.gameLength) {
            error = true
            this.setState({errorPoints1: true})
        }
        if (error) {
            return
        }

        this.props.dispatch(actions.adjustPoints([p0, p1]))
        this.props.history.push('/display')
    }

    render = () => {
        const {match} = this.props
        return (
            <div>
                <h3>Adjust Match</h3>
                <ul>
                    <li>
                        <input type='text' value={this.state.points0}
                               onChange={this.updatePoints0} />
                        {match.player0.name}
                        {this.state.errorPoints0 &&
                            <b>&nbsp Invalid</b>
                        }
                    </li>
                    <li>
                        <input type='text' value={this.state.points1}
                               onChange={this.updatePoints1} />
                        {match.player1.name}
                        {this.state.errorPoints1 &&
                            <b>&nbsp Invalid</b>
                        }
                    </li>
                </ul>
                <Link to='/display'>
                    <button>Cancel</button>
                </Link>
                <button onClick={this.adjust}>Adjust</button>
            </div>
        )
    }
}

AdjustMatch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    match: state.match
})

export default connect(mapStateToProps)(AdjustMatch)
