import React from 'react'
import PropTypes from 'prop-types'

export default class GamePad extends React.Component {
    gamePadMappings = (id) => {
        let mappings = {
            'Gamesir-G4s 1.16 (Vendor: 05ac Product: 044d)' : {
                0: 'A',
                1:'B',
                3: 'X',
                4: 'Y',
                6: 'LB',
                7: 'RB',
                8: 'LT',
                9: 'RT',
                13: 'LD',
                14: 'RD',
                10: 'Select',
                11: 'Start'
            }
        }
        if(id in mappings) {
            return mappings[id]
        } else {
            return null
        }
    }

    componentDidMount = () => {
        this.setState({'pressedButton': null})
        window.addEventListener("gamepadconnected", function(e) {
            let gp = navigator.getGamepads()[0]
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length)
            console.log(gp)
        })
        window.addEventListener("gamepaddisconnected", function(e) {
            console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
        })
        window.requestAnimationFrame(this.gameLoop.bind(this))
    }

    componentWillUnmount = () => {
        window.addEventListener("gamepaddisconnected", function(e) {
          console.log("Gamepad disconnected from index %d: %s",
          e.gamepad.index, e.gamepad.id)
        })
    }

    gameLoop = () => {
      let gamepads = navigator.getGamepads()
      if (!gamepads) {
        return;
      }

      var gp = gamepads[0];
      if(gp){
          let mapping = this.gamePadMappings(gp.id)
          let pressed = true
          for (let i = 0; i < gp.buttons.length; i++) {
              let val = gp.buttons[i]
              let pct = Math.round(val.value * 100) + "%"
              if (val.pressed) {
                  let button = gp.buttons[i]
                  button['timestamp'] = Date.now()
                  if(this.state.pressedButton !== null) {
                      let lastPressed = this.state.pressedButton
                      if(Date.now() > lastPressed + 100) {
                          if (mapping) {
                              console.log(mapping[i] + ' Button Pressed')
                          } else {
                              console.log(i + ' Button Pressed')
                          }
                          this.setState({'pressedButton': Date.now()})
                      }
                  } else {
                      if (mapping) {
                          console.log(mapping[i] + ' Button Pressed')
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
}
