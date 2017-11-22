import React from 'react'
import PropTypes from 'prop-types'

const red = '#f00'
const blue = '#00f'
const off = '#444'

const styleService = {
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '5vw',
}

const stylePoints = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    fontFamily: 'Montserrat Medium',
    fontSize: '35vw',
    color: '#fff',
    border: '20px solid #aaa',
    borderRadius: '15px',
}

const styleMatch = {
    display: 'flex',
    width: '40%',
    alignItems: 'center',
    fontSize: '5vw',
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
        backgroundColor: '#222',
    },
    serviceContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '10%',
    },
    pointsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '75%',
    },
    matchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '10%',
    },
    pointsRedOne: {
        ...stylePoints,
        backgroundColor: red,
        fontSize: '35vw',
    },
    pointsBlueOne: {
        ...stylePoints,
        backgroundColor: blue,
        fontSize: '35vw',
    },
    pointsRedTwo: {
        ...stylePoints,
        backgroundColor: red,
        fontSize: '28vw',
    },
    pointsBlueTwo: {
        ...stylePoints,
        backgroundColor: blue,
        fontSize: '28vw',
    },
    servingRed: {
        ...styleService,
        color: red,
    },
    servingBlue: {
        ...styleService,
        color: blue,
    },
    servingOff: {
        ...styleService,
        color: off,
    },
    matchRed: {
        ...styleMatch,
        justifyContent: 'start',
    },
    matchBlue: {
        ...styleMatch,
        justifyContent: 'flex-end',
    },
    winRed: {
        color: red,
    },
    winBlue: {
        color: blue,
    },
    winOff: {
        color: off,
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
                    <div style={styleServiceRed}>🏓</div>
                    <div style={styleServiceBlue}>🏓</div>
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
                    <div style={styles.matchRed}>
                        {winsRed}
                    </div>
                    <div style={styles.matchBlue}>
                        {winsBlue}
                    </div>
                </div>
            </div>
        )
    }

    renderWins = (playerId) => {
        const toWin = Math.ceil(this.props.matchLength / 2)
        if (toWin === 1) {
            return null
        }
        const colorOn = playerId === 0 ? styles.winRed : styles.winBlue
        const components = []
        for (let i = 1; i <= toWin; i++) {
            let c = null
            let key = `wins-${playerId}-${i}`
            if (i <= this.props.wins[playerId]) {
                c = <span key={key} style={colorOn}>★</span>
            } else {
                c = <span key={key} style={styles.winOff}>☆</span>
            }
            components.push(c)
        }
        if (playerId === 1) {
            components.reverse()
        }
        return components
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
