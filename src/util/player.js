export const otherPlayer = (player) => {
    if (player === 0 || player === '0') {
        return 1
    }
    if (player === 1 || player === '1') {
        return 0
    }
    throw new Error('invalid player: ' + player)
}

