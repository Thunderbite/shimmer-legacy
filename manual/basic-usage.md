# Basic Usage

## Moon library
```
'use strict'

import { Element } from 'shimmer'
import { Sprite } from  'shimmer'

export class Moon extends Element {
  constructor () {
    super()

    let image = Sprite.fromImage( '/image2.png' )
    this.addElementChild( 'image', image )
  }
}
```

## Shimmer component
```
'use strict'

import { Shimmer } from 'shimmer'

import { Moon } from './moon.js'

export class ShimmerComponent extends Shimmer {

  execute () {
    this.ticker.start()

    let moon = new Moon()
    this.stage.addElementChild( 'moon', moon )
  }

}
```