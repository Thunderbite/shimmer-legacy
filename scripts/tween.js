'use strict'

import { approx, loop } from 'modux'

/**
 * This class is used to create a tween
 */
export class Tween {
  /**
   * Creates an instance of Shimmer
   * @param {Number} from The start number
   * @param {Number} to The end number
   * @param {Number} step The value to increment by on each render
   */
  constructor ( from, to, step ) {
    /**
     * Stores all event handlers attached
     * @type {Object}
     * @private
     */
    this.__eventHandlers = {}

    /**
     * Stores the starting point for the loop
     * @type {Number}
     */
    this.from = from || 0

    /**
     * Stores the end point for the loop
     * @type {Number}
     */
    this.to = to || 0

    /**
     * Stores the step value for the loop
     * @type {Number}
     */
    this.step = step || 0

    /**
     * Stores the current frame in the tween
     * @type {Number}
     * @private
     */
    this.__current = this.from
  }

  /**
   * Method to attach an event listener to tween
   * @param {String} ev The event name
   * @param {Function} handler The event handler to be attached to the tween
   * @return {Tween} Returns the instance of the class
   */
  on ( ev, handler ) {
    this.__eventHandlers[ ev ] = this.__eventHandlers[ ev ] || []
    if ( typeof handler !== 'function' ) {
      throw new Error( 'Tween expects an event handler ( function ) ' + ( typeof handler ) + ' given' )
    }
    this.__eventHandlers[ ev ].push( handler )
    return this
  }

  // Shorthand event handlers

  /**
   * Short hand for the onEach event listener to attach
   * @param {Function} handler The event handler to be attached to the tween
   * @return {Tween} Returns the instance of the class
   */
  each ( handler ) {
    return this.on( 'each', handler )
  }
  /**
   * Short hand for the onEnd event listener to attach
   * @param {Function} handler The event handler to be attached to the tween
   * @return {Tween} Returns the instance of the class
   */
  end ( handler ) {
    return this.on( 'end', handler )
  }

  /**
   * Calls every event listener attached to the class
   * @param {String} name The event name
   * @param {Number} value The value to be sent to each handler
   * @private
   */
  __triggerEvent ( name, value ) {
    let events = this.__eventHandlers[ name ] || []
    loop( events, ( event ) => {
      event.call( this, value )
    } )
  }

  /**
   * Moves to a specific position in the tween
   * @param {Number} frame The numeric position to move to in the tween
   * @return {Tween} Returns the instance of the class
   */
  goto ( frame ) {
    if ( frame ) {
      this.__current = frame
    } else {
      this.__current = this.from
    }
    return this
  }

  /**
   * Method moves forward in the tween based on the detal
   * @param {Number} delta The time interval caused by FPS
   */
  next ( delta ) {
    this.__current = approx( this.__current + approx( this.step * delta, 6 ) )

    if ( this.__current >= this.to ) {
      // End
      this.__triggerEvent( 'end' )
      this.__current = this.to
    }

    this.__triggerEvent( 'each', this.__current )
  }

  /**
   * Method moves backwards in the tween based on the detal
   * @param {Number} delta The time interval caused by FPS
   */
  prev ( delta ) {
    this.__current = approx( this.__current - approx( this.step * delta, 6 ) )

    if ( this.__current <= this.from ) {
      // End
      this.__triggerEvent( 'end' )
      this.__current = this.from
    }

    this.__triggerEvent( 'each', this.__current )
  }
}
