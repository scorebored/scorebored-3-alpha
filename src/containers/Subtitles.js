import { connect } from 'react-redux'

import Subtitles from '../components/Subtitles'

const mapStateToProps = (state) => ({
    text: state.announcer.speaking,
})

export default connect(mapStateToProps)(Subtitles)