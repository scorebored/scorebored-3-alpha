import { store } from './store'
//import * as matchActions from '@/match'

export default () => {
    window.store = () => store.getState()
    window.dispatch = store.dispatch
    //window.match = matchActions
}