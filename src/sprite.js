'use strict'

const PIXI = require( 'pixi.js' )

module.exports = class Sprite extends PIXI.extras.AnimatedSprite {
  constructor ( frames ) {
    if ( !frames ) {
      super( [] )
    } else if ( !Array.isArray( frames ) ) {
      super( [ frames ] )
    } else {
      super( frames )
    }

    this.__eventHandlers = {}

    this.anchor.x = 0.5
    this.anchor.y = 0.5
    this.animationSpeed = 1
    this.blend = 'NORMAL'
    this.loop = false

    this.onLoop = () => {
      this.__triggerEvent( 'loop' )
    }
    this.onComplete = () => {
      this.__triggerEvent( 'end' )
    }
    this.onFrameChange = ( frame ) => {
      this.__triggerEvent( 'each', frame )
    }
  }

  __triggerEvent ( name, value ) {
    let events = this.__eventHandlers[ name ]
    for ( let i = 0; i < events.length; i++ ) {
      events[ i ]( value )
    }
  }

  on ( ev, handler ) {
    this.__eventHandlers[ ev ] = this.__eventHandlers[ ev ] || []
    if ( typeof handler !== 'function' ) {
      throw new Error( 'Sprite expects an event handler ( function ) ' + ( typeof handler ) + ' given' )
    }
    this.__eventHandlers[ ev ].push( handler )
  }

  // Shorthand event handlers
  each ( handler ) {
    this.on( 'each', handler )
  }
  end ( handler ) {
    this.on( 'end', handler )
  }
  loop ( handler ) {
    this.on( 'loop', handler )
  }
}
