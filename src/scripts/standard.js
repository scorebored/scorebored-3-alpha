
export default class StandardScript {

    sayPoint = (playerId) => {
        this.say(`Point ${this.playerName(playerId)}`)
    }

    sayPointsAll = (points) => {
        this.say(`${points} all`)
    }

    sayPointsToPoints = (p0, p1) => {
        this.say(`${p0} to ${p1}`)
    }

    say = (phrase) => {
         this.phrases.push(phrase)
    }

    announce = (was, now) => {
        this.was = was
        this.now = now
        this.phrases = []

        const type = now.announce
        if (type === 'point') {
            this.awardPoint()
        }
        return this.phrases
    }

    awardPoint = () => {
        const pwas = this.was.game.points
        const pnow = this.now.game.points

        const awardedTo = pwas[0] != pnow[0] ? 0 : 1
        this.sayPoint(awardedTo)

        if (pnow[0] === pnow[1]) {
            this.sayPointsAll(pnow[0])
        } else {
            this.sayPointsToPoints(pnow[0], pnow[1])
        }
    }

    playerName = (playerId) => {
        return playerId === 0 ? 'Red': 'Blue'
    }

}