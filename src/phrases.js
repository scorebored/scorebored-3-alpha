const phrases = {
    'Red serves first': {},
    'Blue serves first': {},
    'Switch servers': {},
    'Point Red': {},
    'Point Blue': {},
    'Game point': {},
    'Match point': {},
    'Advantage Red': {},
    'Advantage Blue': {},
    'Deuce': {},
    'Red wins the game': {},
    'Blue wins the game': {},
    'Red wins the match': {},
    'Blue wins the match': {},
    'Switch sides': {},

    'Slurpees': {say: 'Slurpees!'},
    'Always remember': {},
    'Double Kenfer': {},
    'Turkey': {},
    'Kenfer': {},
    'Ofer': {say: 'Oh fer!'},
    'Double Ofer': {say: 'Double Oh fer!'},
    'Sorry Blue team': {},
    'Sorry Red team': {},
    'Jacob is not impressed': {},
}

export default phrases

for (let red = 0; red <= 20; red++) {
    for (let blue = 0; blue <= 20; blue++) {
        if (red === 0 && blue === 0) {
            continue
        }
        if (red === 20 && blue === 20) {
            continue
        }
        if (red === blue) {
            let p = `${red} all`
            phrases[p] = {}
        } else {
            let p = `${red} to ${blue}`
            phrases[p] = {}
        }
    }
}

for (let red = 0; red <= 3; red++) {
    for (let blue = 0; blue <= 3; blue++) {
        if (red === 0 && blue === 0) {
            continue
        }
        if (red === blue) {
            let total = red
            const game = total === 1 ? 'game' : 'games'
            phrases[`Match is tied at ${total} ${game} each`] = {}
        } else if (red > blue) {
            const more = red
            const less = blue
            const game = more === 1 ? 'game' : 'games'
            phrases[`Red leads the match ${more} ${game} to ${less}`] = {}
        } else if (red < blue) {
            const more = blue
            const less = red
            const game = more === 1 ? 'game' : 'games'
            phrases[`Blue leads the match ${more} ${game} to ${less}`] = {}
        }
    }
}

for (let score = 0; score <= 20; score++) {
    if (score === 10) {
        phrases['Ken all'] = {}
    } else {
        let p1 = `Ken to ${score}`
        let p2 = `${score} to Ken`
        phrases[p1] = {}
        phrases[p2] = {}
    }
}



