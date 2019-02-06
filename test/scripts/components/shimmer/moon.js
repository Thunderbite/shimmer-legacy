'use strict'

import { radians } from 'modux'
import { Sprite } from 'pixi.js'

import { Element } from './../../../../scripts'

export class Moon extends Element {
  constructor () {
    super()

    let image = Sprite.fromImage( '/image2.png' )

    image.anchor.x = 0.5
    image.anchor.y = 0.5

    this.alpha = 0

    this.__angle = 0
    this.__radius = 0
    this.__speed = 1
    this.__centerX = 0
    this.__centerY = 0

    this.__rotating = false

    this.addChild( image )
  }

  __move ( delta ) {
    delta = delta || 1
    this.x = this.__centerX + this.__radius * Math.cos( radians( this.__angle ) ) * delta
    this.y = this.__centerY + this.__radius * Math.sin( radians( this.__angle ) ) * delta
  }

  setCenter ( x, y ) {
    this.__centerX = x
    this.__centerY = y
    this.__move()
  }
  setAngle ( angle ) {
    this.__angle = angle
    this.__move()
  }
  setRadius ( radius ) {
    this.__radius = radius
    this.__move()
  }
  setSpeed ( speed ) {
    this.__speed = speed
  }

  start () {
    this.__rotating = true
  }

  stop () {
    this.__rotating = false
  }

  render ( delta ) {
    if ( this.__rotating ) {
      this.__angle = this.__angle + this.__speed
      if ( this.__angle === 360 ) {
        this.__angle = 0
      }
      this.__move( delta )
    }
  }
}
