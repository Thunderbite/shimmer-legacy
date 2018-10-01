'use strict'

module.exports = ( collection, cb ) => {
  if ( collection ) {
    for ( let i = 0, k = Object.keys( collection ), l = k.length; i < l; i++ ) {
      let result = cb( collection[ k[ i ] ], Array.isArray( collection ) ? parseInt( k[ i ] ) : k[ i ] )
      if ( result === false ) {
        break
      }
    }
    return
  }
}
