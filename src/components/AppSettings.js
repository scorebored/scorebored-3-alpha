import React from 'react'
import PropTypes from 'prop-types'

import talkers from '../talkers'
import scripts from '../scripts'

const styles = {
    section: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        width: '300px',
    }
}

export default class AppSettings extends React.Component {

    changeTalker = (event) => {
        this.props.setTalker(event.target.value)
    }

    changeScript = (event) => {
        this.props.setScript(event.target.value)
    }

    changeSubtitles = (event) => {
        this.props.enableSubtitles(event.target.checked)
    }

    sampleAnnouncement = () => {
        const talker = talkers[this.props.talker]
        const script = scripts[this.props.script]
        talker.cancel()
        talker.say(script.sample())
    }

    done = () => {
        this.props.done()
    }

    render = () => {
        return (
            <div className='page'>
                <div style={styles.section}>
                    <h3>Talker</h3>
                    <label>
                        <input
                            type='radio'
                            value='standard'
                            checked={this.props.talker === 'standard'}
                            onChange={this.changeTalker}/>
                        Standard
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='mute'
                            checked={this.props.talker === 'mute'}
                            onChange={this.changeTalker}>
                        </input>
                        Mute
                    </label>
                </div>
                <div style={styles.section}>
                    <h3>Script</h3>
                    <label>
                        <input
                            type='radio'
                            value='standard'
                            checked={this.props.script === 'standard'}
                            onChange={this.changeScript}>
                        </input>
                        Standard
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='bts'
                            checked={this.props.script === 'bts'}
                            onChange={this.changeScript}>
                        </input>
                        BTS
                    </label>
                </div>
                <div style={styles.section}>
                    <h3>Options</h3>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.props.subtitles}
                            onChange={this.changeSubtitles}/>
                        Subtitles
                    </label>
                </div>
                <div style={styles.section}>
                    <button style={styles.button} onClick={this.sampleAnnouncement}>Test Announcer</button>
                    <button style={styles.button} onClick={this.props.done}>Done</button>
                </div>
            </div>
        )
    }
}

AppSettings.propTypes = {
    talker: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    subtitles: PropTypes.bool.isRequired,

    setTalker: PropTypes.func.isRequired,
    setScript: PropTypes.func.isRequired,
    enableSubtitles: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
}
