import Mute from './mute'
import WebApiTalker from './web-api'

const mute = new Mute()
const standard = new WebApiTalker()

export default {
    mute,
    standard,
}
