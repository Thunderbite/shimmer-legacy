/* globals window */

'use strict'

import { Component, loop } from 'modux'

import { Loader } from '@pixi/loaders'
import { Ticker } from '@pixi/ticker'
import { autoDetectRenderer, Renderer, BatchRenderer } from '@pixi/core'
import { InteractionManager } from '@pixi/interaction'
import { skipHello } from '@pixi/utils'

Renderer.registerPlugin( 'interaction', InteractionManager )
Renderer.registerPlugin( 'batch', BatchRenderer )

import { Element } from './element.js'

/**
 * This class is used to create the shimmer component
 */
export class Shimmer extends Component {
  /**
   * The html string that becomes the view for this component
   * @type {String}
   */
  get template () {
    return '<canvas style="display: block; width: 100%; height: 100%;"></canvas>'
  }

  /**
   * The method gets called whenever the container is resized
   * @param {Number} width The width of the container
   * @param {Number} height The height of the container
   */
  onResize ( width, height ) {
    this.renderer.resize( width, height )
  }

  /**
   * This method preloads a colection of assets
   * @param {Object} assets A collection of assets
   * @return {Promise} A promise which is resolved upon loading the assets. It resolves the loaded resources.
   */
  preload ( assets ) {
    let loader = new Loader()
    return new Promise( ( resolve ) => {
      loop( assets, ( data, name ) => {
        loader.add( name, data )
      } )
      loader.load( ( loader, resources ) => {
        resolve( resources )
      } )
    } )
  }

  /**
   * Creates an instance of Shimmer
   * @param {HTMLElement} parent The parent wrapper
   * @param {Module} module The parent module instance
   * @param {Config} config A Config class instance
   * @param {Store} store A Store class instance
   */
  constructor ( parent, module, config, store ) {
    super( parent, module, config, store )

    skipHello()

    /**
     * Stores the parent Element
     * @type {Element}
     */
    this.stage = new Element()
    this.stage.__config = this.config
    this.stage.__store = this.store

    /**
     * Holds the previous width and height of the parent container
     * @type {Object}
     * @private
     */
    let previousParentSize = {}
    /**
     * Determines if the component watches for resize changes in parent dimensions
     * @type {Boolean}
     * @private
     */
    this.__resizeWatcher = true
    /**
     * This function checks for parent size changes every 100ms as long as the component exists
     * @type {Function}
     * @private
     */
    const parentResizeCheck = () => {
      setTimeout( () => {
        if ( this.__resizeWatcher ) {
          if ( previousParentSize.width !== this.parent.clientWidth || previousParentSize.height !== this.parent.clientHeight ) {
            previousParentSize.width = this.parent.clientWidth
            previousParentSize.height = this.parent.clientHeight
            this.onResize( previousParentSize.width, previousParentSize.height )
          }
          parentResizeCheck()
        }
      }, 100 )
    }
    parentResizeCheck()

    /**
     * Stores the main ticker, which handles animation frames
     * @type {Ticker}
     */
    this.ticker = new Ticker()
    this.ticker.add( ( delta ) => {
      this.stage.tick( delta )
      this.renderer.render( this.stage )
    } )

    /**
     * Stores the renderer
     * @type {Renderer}
     */
    this.renderer = autoDetectRenderer( {
      view: this.element,
      transparent: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1
    } )

    this.renderer.resize( this.element.clientWidth, this.element.clientHeight )

    this.renderer.plugins.interaction.autoPreventDefault = false
  }

  /**
   * The method gets called when the component is destroyed
   */
  __destroy () {
    super.__destroy()
    this.__resizeWatcher = false
    if ( this.ticker.started ) {
      this.ticker.stop()
    }
  }
}
