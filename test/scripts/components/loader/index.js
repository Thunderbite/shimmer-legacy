'use strict'

const modux = require( 'modux' )
const template = require( './template.html' )

class Loader extends modux.Component {
  get template () {
    return template
  }

  execute () {
    this.element.classList.add( 'hide' )

    this.store.on( 'loader-show', ( progress ) => {
      this.element.classList.remove( 'hide' )
      this.element.querySelector( '.progress' ).innerHTML = parseInt( progress ) + ' %'
    }, true )

    this.store.on( 'loader-hide', () => {
      this.element.classList.add( 'hide' )
    }, true )
  }
}

module.exports = Loader
