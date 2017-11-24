import { combineReducers } from 'redux'

import match from './ducks/match'
import announcer from './ducks/announcer'

export default combineReducers({
    match,
    announcer,
})
