'use strict'

const modux = require( 'modux' )
const template = require( './template.html' )

class Layout extends modux.Component {
  get template () {
    return template
  }
}

module.exports = Layout
