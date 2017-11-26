import Mute from './mute'
import LocalTalker from './local'
import WebApiTalker from './web-api'

const mute = new Mute()
const local = new LocalTalker()
const web = new WebApiTalker()

export default {
    mute,
    local,
    web,
}
