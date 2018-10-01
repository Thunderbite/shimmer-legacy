'use strict'

const modux = require( 'modux' )
const template = require( './template.html' )

const shimmer = require( './../../../../src' )

class Game extends modux.Component {
  get template () {
    return template
  }

  execute () {
    this._stage = new shimmer.Stage()
    this.store.emit( 'loader-show', 0 )
    this._stage.preload( {
      'image1': '/images/radial_turn_on.png',
      'image2': '/images/radial_turn_off.png'
    }, ( progress ) => {
      this.store.emit( 'loader-show', progress )
    } )
      .then( ( resources ) => {
        this.store.emit( 'loader-hide' )
      } )
  }

  terminate () {
    this._stage.stop()
  }
}

module.exports = Game
