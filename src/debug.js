import {store} from './store'
import * as matchActions from './ducks/match'
//import talkers from './lib/talkers'

export default () => {
    window.$ = {
        store: () => store.getState(),
        dispatch: store.dispatch,
        //talkers,
        matchActions,
    }
}