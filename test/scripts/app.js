/* globals window, document */

'use strict'

const modux = require( 'modux' )

const defaults = require( './defaults.js' )

let initialize = () => {
  modux.config.set( '', defaults )

  modux.utils.logger.enabled( modux.config.get( 'debug' ) )

  modux.utils.logger.info( 'Application start' )

  // Render content
  let app = new modux.Module( 'app' )
  app
    .addDependency( 'layout', require( './components/layout' ) )
    .addDependency( 'game', require( './components/game' ) )
    .addDependency( 'loader', require( './components/loader' ) )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
  modux.utils.logger.log( 'Configuration', modux.config.get() )
}

window.addEventListener( 'load', () => {
  initialize()
} )
