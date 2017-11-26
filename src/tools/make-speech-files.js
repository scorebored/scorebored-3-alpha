import {execSync} from 'child_process'
import phrases from '../phrases'
import log from 'loglevel'

export const makeSpeechFiles = () => {
    log.setDefaultLevel('info')
    Object.entries(phrases).forEach((entry) => {
        const [phrase, params] = entry
        let speech = phrase
        if (params.say) {
            speech = params.say
        }

        let filename = phrase.replace(/ /g, '_')
        let cmd = `say -o /tmp/${filename} "${speech}"`
        log.info(cmd)
        execSync(cmd)

        cmd = `ffmpeg -y -i /tmp/${filename}.aiff -c:a libvorbis -qscale:a 5 ${__dirname}/../resources/speech/${filename}.ogg`
        execSync(cmd)

        cmd = `rm /tmp/${filename}.aiff`
        execSync(cmd)
    })
}
