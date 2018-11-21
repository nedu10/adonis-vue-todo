'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AuthorizationErrorException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    console.log('can you see me here');
    
    return response.status(401).json({
      status: "Failed",
      message: "You are not authorize to delete this resource"
    })
  }
}

module.exports = AuthorizationErrorException
