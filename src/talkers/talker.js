import {EventEmitter} from 'events'
import log from 'loglevel'

export default class Talker {

    constructor() {
        this.queue = []
        this.talking = false
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
            this.silence()
        }
        this.queue = []
        this.talking = false
        this.events.emit('silence')
    }

    processQueue = () => {
        if (this.queue.length === 0) {
            this.talking = false
            this.events.emit('silence')
            return
        }
        const phrase = this.queue.shift()
        this.talking = true
        this.utter(phrase)
        this.events.emit('say', phrase)
    }

    error = (reason) => {
        this.talking = false
        log.error('unable to speak:', reason)
    }
}