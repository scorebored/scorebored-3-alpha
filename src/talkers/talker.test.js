import Mute from './mute'

jest.useFakeTimers()

test('it should process a list of phrases', () => {
    const t = new Mute()

    const say = jest.fn()
    t.events.on('say', say)

    t.say(['Alpha', 'Bravo', 'Charlie'])

    expect(say.mock.calls.length).toBe(1)
    expect(say).toBeCalledWith('Alpha')
    jest.runOnlyPendingTimers()
    expect(say.mock.calls.length).toBe(2)
    expect(say).toBeCalledWith('Bravo')
    jest.runOnlyPendingTimers()
    expect(say.mock.calls.length).toBe(3)
    expect(say).toBeCalledWith('Charlie')
})

test('it should cancel pending phrases', () => {
    const t = new Mute()

    const say = jest.fn()
    t.events.on('say', say)

    t.say(['Alpha', 'Bravo', 'Charlie'])

    expect(say.mock.calls.length).toBe(1)
    expect(say).toBeCalledWith('Alpha')
    jest.runOnlyPendingTimers()
    expect(say.mock.calls.length).toBe(2)
    expect(say).toBeCalledWith('Bravo')

    t.cancel()
    t.say('Apple')
    jest.runOnlyPendingTimers()
    expect(say.mock.calls.length).toBe(3)
    expect(say).toBeCalledWith('Apple')
})