import {connect} from 'react-redux'

import Announcer from '../components/Announcer'

const mapStateToProps = (state) => ({
    match: state.match,
})

export default connect(mapStateToProps)(Announcer)