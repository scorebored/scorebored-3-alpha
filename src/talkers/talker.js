import {EventEmitter} from 'events'
import log from 'loglevel'

export default class Talker {

    constructor() {
        this.queue = []
        this.talking = null
        this.events = new EventEmitter()
    }

    say = (phrases) => {
        if (!Array.isArray(phrases)) {
            phrases = [phrases]
        }
        this.queue = this.queue.concat(phrases)
        if (!this.talking) {
            this.processQueue()
        }
    }

    cancel = () => {
        if (this.talking) {
            this.talking.cancel()
        }
        this.queue = []
        this.talking = null
        this.events.emit('silence')
    }

    processQueue = () => {
        if (this.queue.length === 0) {
            this.talking = null
            this.events.emit('silence')
            return
        }
        const phrase = this.queue.shift()
        const {talking, promise} = this.utter(phrase)
        this.events.emit('say', phrase)
        this.talking = talking
        promise.then(this.processQueue).catch(this.error)
    }

    error = (reason) => {
        log.error('unable to speak:', reason)
    }
}