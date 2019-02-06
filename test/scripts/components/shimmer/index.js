'use strict'

import { rnd, loop } from 'modux'

import { Shimmer } from './../../../../scripts'

import { ButtonMain } from './buttonMain.js'
import { Moon } from './moon.js'

export class ShimmerComponent extends Shimmer {
  onResize ( width, height ) {
    super.onResize( width, height )
    this.__button.x = this.renderer.width / this.renderer.resolution / 2
    this.__button.y = this.renderer.height / this.renderer.resolution / 2

    loop( this.__moons, ( moon ) => {
      moon.setCenter( this.__button.x, this.__button.y )
      moon.show()
    } )
  }

  execute () {
    this.ticker.start()

    this.__button = new ButtonMain()
    this.stage.addElementChild( 'button', this.__button )

    this.__moons = {}

    for ( let i = 0; i < 10; i++ ) {
      let moon = new Moon()
      moon.setAngle( rnd( 0, 359 ) )
      moon.setRadius( rnd( 200, 500 ) )
      moon.setSpeed( rnd( 10, 50 ) / 10 )
      moon.setCenter( this.__button.x, this.__button.y )

      this.stage.addElementChild( 'moon' + i, moon )

      this.__moons[ i ] = moon
    }

    this.__button.onMouseDown( () => {
      loop( this.__moons, ( moon ) => {
        moon.start()
      } )
    } )

    this.__button.onMouseUp( () => {
      loop( this.__moons, ( moon ) => {
        moon.stop()
      } )
    } )
    this.__button.onMouseUpOutside( () => {
      loop( this.__moons, ( moon ) => {
        moon.stop()
      } )
    } )
  }
}
