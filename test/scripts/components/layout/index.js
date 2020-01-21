'use strict'

import { Component } from '@crispcode/modux'

export class LayoutComponent extends Component {
  get template () {
    return require( './template.html' )
  }
}
