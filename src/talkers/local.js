import Talker from './talker'

const speechDir = `${__dirname}/../resources/speech`
const phraseDelay = 250 // ms

export default class LocalTalker extends Talker {

    constructor() {
        super()
        this.context = new AudioContext()
        this.clips = {}
        this.source = null
        this.timer = null
    }

    utter = (phrase) => {
        this.silence()
        const filename = `${speechDir}/${phrase.replace(/ /g, '_')}.ogg`
        if (!this.clips[filename]) {
            this.load(filename)
        } else {
            this.play(filename)
        }
    }

    play = (filename) => {
        this.source = this.context.createBufferSource()
        this.source.buffer = this.clips[filename]
        this.source.connect(this.context.destination)
        this.source.onended = this.wait
        this.source.start(0)
    }

    silence = () => {
        if (this.source) {
            clearTimeout(this.timer)
            this.source.stop()
            this.source = null
        }
    }

    load = (filename) => {
        var request = new XMLHttpRequest()
        request.open('GET', filename, true)
        request.responseType = 'arraybuffer'

        request.onload = () => {
            this.context.decodeAudioData(request.response, (buffer) => {
                this.clips[filename] = buffer
                this.play(filename)
            }, this.error)
        }
        request.send()
    }

    // Instead of resolving right away, put in a slight delay. This makes
    // the speech sound more natural when there are back-to-back phrases.
    // Otherwise, the speech sounds too rushed
    wait = () => {
        // If this phrase is canceled, do not resolve the promise as the
        // application is no longer interested.
        if (!this.source) {
            return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(this.processQueue, phraseDelay)
    }
}