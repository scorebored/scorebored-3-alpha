import StandardScript from './standard'

const jacobianLine = 12

export default class BtsScript extends StandardScript {

    sample() {
        return [
            'Sorry Blue team',
            'Jacob is not impressed',
        ]
    }

    sayPointsToPoints(p0, p1) {
        if (p0 === 7 && p1 === 11) {
            this.say('Slurpees')
            return
        }
        if (p0 === 9 && p1 === 11) {
            this.say('Always remember')
            return
        }
        if (p0 === 10) {
            p0 = 'Ken'
        }
        if (p1 === 10) {
            p1 = 'Ken'
        }
        super.sayPointsToPoints(p0, p1)
    }

    sayPointsAll(points) {
        if (points === 10) {
            points = 'Ken'
        }
        super.sayPointsAll(points)
    }

    saySwitchServers() {
        const streak = Math.max(
            this.now.game.streak[0],
            this.now.game.streak[1]
        )
        if (this.now.settings.gameLength === 21) {
            if (streak >= 20) {
                this.say('Double Kenfer')
            } else if (streak >= 15) {
                this.say('Turkey')
            } else if (streak >= 10) {
                this.say('Kenfer')
            } else if (streak >= 5) {
                this.say('Ofer')
            }
        } else {
            if (streak >= 8) {
                this.say('Double Ofer')
            } else if (streak >= 4) {
                this.say('Ofer')
            }
        }
        super.saySwitchServers()
    }

    sayWinsGame(playerId) {
        super.sayWinsGame(playerId)
        this.checkNotImpressed()
    }

    sayWinsMatch(playerId) {
        super.sayWinsMatch(playerId)
        this.checkNotImpressed()
    }

    sayNotImpressed(playerId) {
        this.say(`Sorry ${this.playerName(playerId)} team`)
        this.say('Jacob is not impressed')
    }

    checkNotImpressed() {
        if (this.now.settings.gameLength !== 21) {
            return
        }
        const p0 = this.now.game.points[0]
        const p1 = this.now.game.points[1]
        if (p0 <= jacobianLine) {
            this.sayNotImpressed(0)
        }
        if (p1 <= jacobianLine) {
            this.sayNotImpressed(1)
        }
    }
}