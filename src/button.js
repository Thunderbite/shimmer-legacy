'use strict'

const Element = require( './element' )

module.exports = class Button extends Element {
  constructor () {
    super()

    this.buttonMode = true
    this.interactive = true
    this.cursor = 'pointer'

    this.__locked = true
  }

  locked ( locked ) {
    this.__locked = !!locked
  }

  onMouseDown ( f ) {
    this.on( 'pointerdown', () => {
      if ( typeof f === 'function' && !this.__locked ) {
        f()
      }
    } )
  }
  onMouseUp ( f ) {
    this.on( 'pointerup', () => {
      if ( typeof f === 'function' && !this.__locked ) {
        f()
      }
    } )
  }

  onClick ( f ) {
    this.on( 'pointerup', () => {
      if ( typeof f === 'function' && !this.__locked ) {
        f()
      }
    } )
  }

  show () {
    return super.show()
      .then( () => {
        this.__locked = false
      } )
  }

  hide () {
    return super.hide()
      .then( () => {
        this.__locked = true
      } )
  }
}
