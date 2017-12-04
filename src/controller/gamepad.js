import React from 'react'
import PropTypes from 'prop-types'
import * as controller from './index'

export default () => {
    window.addEventListener("gamepadconnected", function(e) {
        let gp = navigator.getGamepads()[0]
        console.log(gp)
    })
    window.requestAnimationFrame(gameLoop)
}

let time_lapse = 200

let pressedButton = null
let pressedDpad = null

const gamePadButtonMappings = (id) => {
    // RAS = Right Analog Stick
    let button_mappings = {
        'Gamesir-G4s 1.16 (Vendor: 05ac Product: 044d)' : {
            0: controller.SELECT, // controller.SELECT
            1: controller.BACK, // controller.BACK
            3: 'X',
            4: 'Y',
            6: controller.UNDO, // controller.UNDO
            7: controller.REDO, // controller.REDO
            8: controller.RED, // controller.RED
            9: controller.BLUE, // controller.BLUE
            13: 'LAS', //
            14: 'RAS',
            10: 'Select',
            11: 'Start'
        }
    }
    if(id in button_mappings) {
        return button_mappings[id]
    } else {
        return null
    }
}

const gamePadDPadMappings = (id) => {
    let dpad_mappings = {
        'Gamesir-G4s 1.16 (Vendor: 05ac Product: 044d)': {
            '-1.000000': controller.CURSOR_UP,
            '0.142857': controller.CURSOR_DOWN,
            '0.714286': controller.CURSOR_LEFT,
            '-0.428571': controller.CURSOR_RIGHT,
        }
    }
    if(id in dpad_mappings) {
        return dpad_mappings[id]
    } else {
        return null
    }
}

export const gameLoop = () => {
      let gamepads = navigator.getGamepads()
      if (!gamepads) {
        return;
      }

      var gp = gamepads[0];
      if(gp){
          let button_mapping = gamePadButtonMappings(gp.id)
          let dpad_mapping = gamePadDPadMappings(gp.id)
          let pressed = true
          if (gp.axes[9] !== -1.2857142686843872 && gp.axes[9] !== 0.000000) {
              let lastDpadPressed = pressedDpad
              if(Date.now() > lastDpadPressed + time_lapse || lastDpadPressed === undefined) {
                  if (dpad_mapping) {
                      controller.emit(dpad_mapping[String(gp.axes[9].toFixed(6))])
                      console.log(dpad_mapping[String(gp.axes[9].toFixed(6))])
                  } else {
                      console.log(gp.axes[9])
                  }
                  pressedDpad = Date.now()
              }
          }
          for (let i = 0; i < gp.buttons.length; i++) {
              let val = gp.buttons[i]
              let pct = Math.round(val.value * 100) + "%"
              if (val.pressed) {
                  let button = gp.buttons[i]
                  button['timestamp'] = Date.now()
                  if(pressedButton !== null) {
                      let lastPressed = pressedButton
                      if(Date.now() > lastPressed + time_lapse) {
                          if (button_mapping) {
                              controller.emit(button_mapping[i])
                              console.log(button_mapping[i] + ' Button Pressed')
                          } else {
                              console.log(i + ' Button Pressed')
                          }
                          pressedButton = Date.now()
                      }
                  } else {
                      if (button_mapping) {
                          controller.emit(button_mapping[i])
                          console.log(button_mapping[i] + ' Button Pressed')
                      } else {
                          console.log(i + ' Button Pressed')
                      }
                      pressedButton = Date.now()
                  }
              }
          }
      }
      requestAnimationFrame(gameLoop);
    }

/*
export default class GamePad extends React.Component {
    componentDidMount = () => {
        this.setState({'pressedButton': null})
        window.addEventListener("gamepadconnected", function(e) {
            let gp = navigator.getGamepads()[0]
        })

        window.requestAnimationFrame(this.gameLoop.bind(this))
    }

    componentWillUnmount = () => {
        window.addEventListener("gamepaddisconnected", function(e) {
          console.log("Gamepad disconnected from index %d: %s",
          e.gamepad.index, e.gamepad.id)
        })
    }

    gamePadButtonMappings = (id) => {
        // RAS = Right Analog Stick
        let button_mappings = {
            'Gamesir-G4s 1.16 (Vendor: 05ac Product: 044d)' : {
                0: 'A', // controller.SELECT
                1: 'B', // controller.BACK
                3: 'X',
                4: 'Y',
                6: 'LB', // controller.UNDO
                7: 'RB', // controller.REDO
                8: 'LT', // controller.RED
                9: 'RT', // controller.BLUE
                13: 'LAS', //
                14: 'RAS',
                10: 'Select',
                11: 'Start'
            }
        }
        if(id in button_mappings) {
            return button_mappings[id]
        } else {
            return null
        }
    }

    gamePadDPadMappings = (id) => {
        let dpad_mappings = {
            'Gamesir-G4s 1.16 (Vendor: 05ac Product: 044d)': {
                '-1.000000': controller.CURSOR_UP,
                '0.142857': controller.CURSOR_DOWN,
                '0.714286': controller.CURSOR_LEFT,
                '-0.428571': controller.CURSOR_RIGHT,
            }
        }
        if(id in dpad_mappings) {
            return dpad_mappings[id]
        } else {
            return null
        }
    }

    gameLoop = () => {
      let gamepads = navigator.getGamepads()
      if (!gamepads) {
        return;
      }

      var gp = gamepads[0];
      if(gp){
          let button_mapping = this.gamePadButtonMappings(gp.id)
          let dpad_mapping = this.gamePadDPadMappings(gp.id)
          let pressed = true
          if (gp.axes[9] !== -1.2857142686843872 && gp.axes[9] !== 0.000000) {
              let lastDpadPressed = this.state.pressedDpad
              if(Date.now() > lastDpadPressed + 100 || lastDpadPressed === undefined) {
                  if (dpad_mapping) {
                      console.log(dpad_mapping[String(gp.axes[9].toFixed(6))])
                  } else {
                      console.log(gp.axes[9])
                  }
                  this.setState({'pressedDpad': Date.now()})
              }
          }
          for (let i = 0; i < gp.buttons.length; i++) {
              let val = gp.buttons[i]
              let pct = Math.round(val.value * 100) + "%"
              if (val.pressed) {
                  let button = gp.buttons[i]
                  button['timestamp'] = Date.now()
                  if(this.state.pressedButton !== null) {
                      let lastPressed = this.state.pressedButton
                      if(Date.now() > lastPressed + 100) {
                          if (button_mapping) {
                              console.log(button_mapping[i] + ' Button Pressed')
                          } else {
                              console.log(i + ' Button Pressed')
                          }
                          this.setState({'pressedButton': Date.now()})
                      }
                  } else {
                      if (button_mapping) {
                          console.log(button_mapping[i] + ' Button Pressed')
                      } else {
                          console.log(i + ' Button Pressed')
                      }
                      this.setState({'pressedButton': Date.now()})
                  }
              }
          }
      }
      requestAnimationFrame(this.gameLoop);
    }

    render = () => {
        return (
            <div>
             <h2 id="start">Press a button on your controller to start</h2>
           </div>
         )
     }
}*/
