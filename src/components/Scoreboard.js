import React from 'react'
import PropTypes from 'prop-types'

const redTeamColor = '#f00'
const blueTeamColor = '#00f'
const onColor = '#fff'
const matColor = '#222'
const borderColor = '#aaa'

const styleServing = {
    padding: '0 1vw',
    border: '2px solid',
    borderRadius: '15px',
    borderColor: matColor,
}

const stylePoints = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    fontFamily: 'Montserrat Medium',
    fontSize: '35vw',
    color: onColor,
    border: '20px solid',
    borderColor,
    borderRadius: '15px',
}

const styleWins = {
    border: '2px solid',
    borderColor,
    borderRadius: '15px',
    padding: '0 1vw',
}

const styles = {
    main: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-around',
        backgroundColor: matColor,
    },
    serviceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '11%',
    },
    pointsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '68%',
    },
    matchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '5%',
    },
    serviceItem: {
        display: 'flex',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '5vw',
        fontFamily: 'Symbola',
    },
    pointsRedOne: {
        ...stylePoints,
        backgroundColor: redTeamColor,
        fontSize: '35vw',
    },
    pointsBlueOne: {
        ...stylePoints,
        backgroundColor: blueTeamColor,
        fontSize: '35vw',
    },
    pointsRedTwo: {
        ...stylePoints,
        backgroundColor: redTeamColor,
        fontSize: '28vw',
    },
    pointsBlueTwo: {
        ...stylePoints,
        backgroundColor: blueTeamColor,
        fontSize: '28vw',
    },
    servingRed: {
        ...styleServing,
        borderColor,
        backgroundColor: redTeamColor,
        color: onColor,
    },
    servingBlue: {
        ...styleServing,
        borderColor,
        backgroundColor: blueTeamColor,
        color: onColor,
    },
    servingOff: {
        display: 'none',
    },
    matchItem: {
        display: 'flex',
        width: '40%',
        alignItems: 'center',
        fontSize: '2vw',
        justifyContent: 'center',
    },
    winRed: {
        ...styleWins,
        backgroundColor: redTeamColor,
        color: onColor,
    },
    winBlue: {
        ...styleWins,
        backgroundColor: blueTeamColor,
        color: onColor,
    }
}

export default class Scoreboard extends React.Component {

    componentDidMount = () => {
        window.addEventListener('keyup', this.keyPressed)
    }

    componentWillUnmount = () => {
        window.removeEventListener('keyup', this.keyPressed)
    }

    render = () => {
        const styleServiceRed = this.props.server === 0
            ? styles.servingRed
            : styles.servingOff
        const styleServiceBlue = this.props.server === 1
            ? styles.servingBlue
            : styles.servingOff
        const stylePointsRed = this.props.points[0] < 10
            ? styles.pointsRedOne
            : styles.pointsRedTwo
        const stylePointsBlue = this.props.points[1] < 10
            ? styles.pointsBlueOne
            : styles.pointsBlueTwo

        const winsRed = this.renderWins(0)
        const winsBlue = this.renderWins(1)

        return (
            <div style={styles.main}>
                <div style={styles.serviceContainer}>
                    <div style={styles.serviceItem}>
                        <span style={styleServiceRed}>🏓</span>
                    </div>
                    <div style={styles.serviceItem}>
                        <span style={styleServiceBlue}>🏓</span>
                    </div>
                </div>
                <div style={styles.pointsContainer}>
                    <div style={stylePointsRed}>
                        {this.props.points[0]}
                    </div>
                    <div style={stylePointsBlue}>
                        {this.props.points[1]}
                    </div>
                </div>
                <div style={styles.matchContainer}>
                    <div style={styles.matchItem}>
                        {winsRed}
                    </div>
                    <div style={styles.matchItem}>
                        {winsBlue}
                    </div>
                </div>
            </div>
        )
    }

    renderWins = (playerId) => {
        if (this.props.matchLength === 1) {
            return null
        }
        const style = playerId === 0 ? styles.winRed : styles.winBlue
        const stars = []
        for (let i = 0; i < this.props.wins[playerId]; i++) {
            stars.push('★')
        }
        return <span style={style}>{stars.join(' ')}</span>
    }

    keyPressed = (event) => {
        if (event.key === 'ArrowLeft') {
            this.update(0)
        }
        if (event.key === 'ArrowRight') {
            this.update(1)
        }
        if (event.key === 'Backspace' && !event.ctrlKey) {
            this.props.undo()
        }
        if (event.key === 'Backspace' && event.ctrlKey) {
            this.props.redo()
        }
        if (event.key === 'Escape') {
            this.props.adjust()
        }
    }

    update = (playerId) => {
        if (this.props.server !== null) {
            this.props.awardPoint(playerId)
        } else {
            this.props.firstServer(playerId)
        }
    }
}

Scoreboard.propTypes = {
    players: PropTypes.array.isRequired,
    points: PropTypes.array.isRequired,
    server: PropTypes.number,
    wins: PropTypes.arrayOf(PropTypes.number).isRequired,
    matchLength: PropTypes.number.isRequired,

    awardPoint: PropTypes.func.isRequired,
    firstServer: PropTypes.func.isRequired,
    adjust: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
}
