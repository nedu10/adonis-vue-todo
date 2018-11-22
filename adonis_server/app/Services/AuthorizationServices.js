const AuthorizationError = use('App/Exceptions/AuthorizationErrorException')
const NotFoundError = use('App/Exceptions/NotFoundErrorException')

class AuthorizationServices {
    verifyAuthorizationPermission (resource, user) {
        if (!resource) {
            throw new NotFoundError() 
            // {
            //     status: "Failed",
            //     message: "Project does not exist"
            // }
        }
        if (resource.user_id !== user.id) {
            throw new AuthorizationError()
        }
    }
}

module.exports = new AuthorizationServices()