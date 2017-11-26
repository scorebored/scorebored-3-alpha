import {store} from './store'
import * as matchActions from './ducks/match'
import * as announcerActions from './ducks/announcer'
import * as tools from './tools'

export default () => {
    window.$ = {
        store: () => store.getState(),
        dispatch: store.dispatch,
        matchActions,
        announcerActions,
        tools
    }
}