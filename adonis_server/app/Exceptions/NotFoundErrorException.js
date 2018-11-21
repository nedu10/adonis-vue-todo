'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundErrorException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {

    return response.status(401).json({
      status: "Failed",
      message: "This Resource is not found"
    })
  }
}

module.exports = NotFoundErrorException
