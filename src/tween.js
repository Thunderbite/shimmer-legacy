'use strict'

module.exports = class Tween {
  constructor ( from, to, step ) {
    this.__eventHandlers = {}

    this.from = from || 0
    this.to = to || 0
    this.step = step || 0

    this.__current = this.from
  }

  static create ( from, to, step ) {
    return new Tween( from, to, step )
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
      events[ i ].call( this, value )
    }
  }

  goto ( frame ) {
    if ( frame ) {
      this.__current = parseInt( frame )
    } else {
      this.__current = this.from
    }
  }

  next ( delta ) {
    this.__current = this.__unapprox( this.__approx( this.__current ) + this.__approx( this.step ) * delta )

    if ( this.__current >= this.to ) {
      // End
      this.__triggerEvent( 'end' )
      this.__current = this.to
    }

    this.__triggerEvent( 'each', this.__current )
  }

  prev ( delta ) {
    this.__current = this.__unapprox( this.__approx( this.__current ) - this.__approx( this.step ) * delta )

    if ( this.__current <= this.from ) {
      // End
      this.__triggerEvent( 'end' )
      this.__current = this.from
    }

    this.__triggerEvent( 'each', this.__current )
  }
}
