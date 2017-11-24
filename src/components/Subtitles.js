import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        pointerEvents: 'none',
    },
    panel: {
        display: 'flex',
        justifyContent: 'center',
        margin: '75vh 10vw 0 10vw',
    },
    text: {
        background: '#000',
        color: '#fff',
        fontFamily: 'Carrois Gothic Regular',
        fontSize: '5vh',
        padding: '0 2vw'
    }
}

export default class Subtitles extends React.Component {

    render = () => {
        if (!this.props.active || !this.props.text) {
            return null
        }
        return (
            <div style={styles.overlay}>
                <div style={styles.panel}>
                    <span style={styles.text}>{this.props.text}</span>
                </div>
            </div>
        )
    }
}

Subtitles.propTypes = {
    active: PropTypes.bool.isRequired,
    text: PropTypes.string,
}
