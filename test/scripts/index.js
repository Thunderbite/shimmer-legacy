/* globals window, document */

'use strict'

import { Module, config, Router, logger } from 'modux'

import { LayoutComponent } from './components/layout'
import { ShimmerComponent } from './components/shimmer'

let initialize = () => {
  config.set( 'core', window.config )

  logger.enabled( config.get( 'core.debug' ) )

  logger.info( 'Application start' )

  Router.setDynamicBase( true )

  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', LayoutComponent )
    .addDependency( 'shimmer', ShimmerComponent )

  app.__config.set( 'app', app )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
