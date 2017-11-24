import React from 'react'
import PropTypes from 'prop-types'


export default class GamePad extends React.Component {

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
          let pressed = true
          for (let i = 0; i < gp.buttons.length; i++) {
              let val = gp.buttons[i]
              let pct = Math.round(val.value * 100) + "%"
              if (val.pressed) {
                  let button = gp.buttons[i]
                  button['timestamp'] = Date.now()
                  if(this.state.pressedButton !== null) {
                      let pressedButton = this.state.pressedButton
                      if(button.timestamp > pressedButton.timestamp + 10) {
                          console.log('Button Pressed')
                          console.log(i)
                          console.log(gp.buttons[i])
                          this.setState({'pressedButton': button})
                      }
                  } else {
                      this.setState({'pressedButton': button})
                      console.log('Button Pressed')
                      console.log(i)
                      console.log(gp.buttons[i])
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
