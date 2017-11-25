import Talker from './talker'

export const phraseDelay = 250 // ms

export default class WebApiTalker extends Talker {

    constructor() {
        super()
        this.synth = window.speechSynthesis
        this.timer = null
        this.utterance = null
    }

    utter = (phrase) => {
        this.silence()
        const utterance = new SpeechSynthesisUtterance(phrase)
        utterance.onend = () => this.wait(utterance)
        utterance.onerror = this.error
        this.synth.speak(utterance)
        this.utterance = utterance
    }

    silence = () => {
        clearTimeout(this.timer)
        if (this.utterance) {
            this.utterance.canceled = true
        }
        this.synth.cancel()
    }

    // Instead of resolving right away, put in a slight delay. This makes
    // the speech sound more natural when there are back-to-back phrases.
    // Otherwise, the speech sounds too rushed
    wait = (utterance) => {
        // If this phrase is canceled, do not resolve the promise as the
        // application is no longer interested.
        if (utterance.canceled) {
            return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(this.processQueue, phraseDelay)
    }

}