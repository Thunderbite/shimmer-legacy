'use strict'

module.exports = class Tween {
  constructor () {
    this.__current = 0

    this.__eventHandlers = {}

    this.__from = 0
    this.__to = 0
    this.__step = 0
    this.__function = ( x ) => {
      return x
    }
  }

  static create ( from, to, step, f ) {
    let tween = new Tween()
    tween.setRange( from, to, step )
    if ( f ) {
      tween.setFunction( f )
    }
    return tween
  }

  // Convert floats to integer to prevent E numbers
  __approx ( n ) {
    return n * Math.pow( 10, 10 )
  }
  __unapprox ( n ) {
    return n / Math.pow( 10, 10 )
  }

  on ( ev, handler ) {
    this.__eventHandlers[ ev ] = this.__eventHandlers[ ev ] || []
    if ( typeof handler !== 'function' ) {
      throw new Error( 'Tween expects an event handler ( function ) ' + ( typeof handler ) + ' given' )
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

  __triggerEvent ( name, value ) {
    let events = this.__eventHandlers[ name ] || []
    for ( let i = 0; i < events.length; i++ ) {
      events[ i ]( value )
    }
  }

  goto ( frame ) {
    if ( frame ) {
      this.__current = parseInt( frame )
    } else {
      this.__current = this.__from
    }
  }

  setRange ( from, to, step ) {
    this.__from = from
    this.__current = from
    this.__to = to
    this.__step = step || 1
  }

  setFunction ( f ) {
    if ( typeof f !== 'function' ) {
      throw new Error( 'Tween requires a function. ' + ( typeof f ) + ' is not a function.' )
    }
    this.__function = f
  }

  next ( delta ) {
    this.__current = this.__unapprox( this.__approx( this.__current ) + this.__approx( this.__step ) * delta )

    if ( this.__current >= this.__to ) {
      // End
      this.__triggerEvent( 'end' )
      this.__current = this.__to
    }

    this.__triggerEvent( 'each', this.__function( this.__current ) )
  }

  prev ( delta ) {
    this.__current = this.__unapprox( this.__approx( this.__current ) - this.__approx( this.__step ) * delta )

    if ( this.__current <= this.__from ) {
      // End
      this.__triggerEvent( 'end' )
      this.__current = this.__from
    }

    this.__triggerEvent( 'each', this.__function( this.__current ) )
  }
}
