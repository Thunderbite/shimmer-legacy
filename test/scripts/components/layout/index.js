'use strict'

import { Component } from 'modux'

export class LayoutComponent extends Component {
  get template () {
    return require( './template.html' )
  }
}
