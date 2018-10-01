'use strict'

const PIXI = require( 'pixi.js' )

module.exports = class Text extends PIXI.Text {
  constructor () {
    super( ' ' )

    this.style = {
      fontFamily: 'WH Hoxton',
      fontSize: 12,
      fontWeight: 'normal',
      fill: 0xffffff,
      align: 'center',
      trim: true
    }

    this.anchor.x = 0.5
    this.anchor.y = 0.5
  }
}
