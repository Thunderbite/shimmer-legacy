'use strict'

const PIXI = require( 'pixi.js' )
PIXI.utils.skipHello()
const loop = require( './loop.js' )

module.exports = class Stage {
  preload ( data, progress ) {
    let loader = new PIXI.loaders.Loader()
    loader.onProgress.add( ( loader ) => {
      if ( typeof progress === 'function' ) {
        progress( loader.progress )
      }
    } )
    return new Promise( ( resolve ) => {
      // Data
      loop( data, ( value, key ) => {
        loader.add( key, value )
      } )
      loader.load( ( loader, resources ) => {
        resolve( resources )
      } )
    } )
  }

  constructor ( domElement ) {
    this.__scenes = {}
    this.__scene = null

    this.__renderer = PIXI.autoDetectRenderer( {
      view: domElement,
      transparent: true,
      antialias: true,
      resolution: 1
    } )

    this.__stage = new PIXI.Container()

    this.__renderer.plugins.interaction.autoPreventDefault = false

    this.__ticker = new PIXI.ticker.Ticker()

    // Main
    this.__ticker.add( ( delta ) => {
      loop( this.__scenes, ( scene ) => {
        loop( scene.getElements(), ( element ) => {
          element.render( delta )
        } )
      } )
      this.__renderer.render( this.__stage )
    } )
  }

  resize ( w, h ) {
    this.__renderer.resize( w, h )
  }

  locked ( locked ) {
    this.__renderer.plugins.interaction.autoPreventDefault = !!locked
  }

  addScene ( id, scene ) {
    this.__scenes[ id ] = scene
    return this
  }
  removeScene ( id ) {
    delete this.__scenes[ id ]
    return this
  }

  setScene ( id ) {
    if ( this.__scene ) {
      loop( this.__scene.getElements(), ( element ) => {
        this.__stage.removeChild( element )
      } )
    }
    this.__scene = this.__scenes[ id ]
    loop( this.__scene.getElements(), ( element ) => {
      this.__stage.addChild( element )
    } )
  }

  start () {
    this.__ticker.start()
  }

  stop () {
    this.__ticker.stop()
  }
}
