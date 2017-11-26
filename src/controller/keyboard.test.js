import * as controller from './index'
import * as keyboard from './keyboard'

afterEach(() => {
    controller.removeAllListeners()
})

test('debounce', () => {
    const listener = jest.fn()
    controller.addListener(listener)
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keyup({key: 'ArrowUp'})
    expect(listener.mock.calls.length).toBe(1)
})

test('two presses', () => {
    const listener = jest.fn()
    controller.addListener(listener)
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keyup({key: 'ArrowUp'})
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keydown({key: 'ArrowUp'})
    keyboard.keyup({key: 'ArrowUp'})
    expect(listener.mock.calls.length).toBe(2)
})