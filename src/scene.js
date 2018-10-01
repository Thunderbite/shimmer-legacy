'use strict'

module.exports = class Scene {
  constructor () {
    this.__elements = {}
  }

  addElement ( id, element ) {
    this.__elements[ id ] = element
    return this
  }
  removeElement ( id ) {
    delete this.__elements[ id ]
    return this
  }

  getElements () {
    return this.__elements
  }
}
