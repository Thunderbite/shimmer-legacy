'use strict'

const PIXI = require( 'pixi.js' )
const Tween = require( './tween' )
const uid = require( './uid' )
const loop = require( './loop.js' )

module.exports = class Element extends PIXI.Container {
  constructor () {
    super()

    this.x = 0
    this.y = 0
    this.alpha = 0

    this.__tweens = {}
    this.__children = {}
  }

  _createTween ( from, to, step, f, oneach ) {
    let id = uid()
    let tween = Tween.create( from, to, step, f )
    tween.end( () => {
      delete this.__tweens[ id ]
    } )
    if ( typeof oneach === 'function' ) {
      tween.each( oneach )
    }
    this.__tweens[ id ] = tween
    return tween
  }

  addChild ( id, element ) {
    super.addChild( element )
    this.__children[ id ] = element
    return this
  }
  removeChild ( id ) {
    let element = this.__children[ id ]
    super.removeChild( element )
    delete this.__children[ id ]
    return this
  }

  show () {
    this.alpha = 1
    return Promise.resolve()
  }

  hide () {
    this.alpha = 0
    return Promise.resolve()
  }

  render ( delta ) {
    loop( this.__tweens, ( tween ) => {
      tween.next( delta )
    } )
  }
}
