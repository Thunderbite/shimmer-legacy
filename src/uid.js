'use strict'

let cache = []
let lastReset = Date.now()

const uid = () => {
  if ( lastReset !== Date.now() ) {
    cache.length = 0
  }
  let id = Date.now() + '' + Math.random().toString().substr( 2 )
  for ( let i = 0; i < cache.length; i++ ) {
    if ( cache[ i ] === id ) {
      return uid()
    }
  }
  return id
}

module.exports = uid
