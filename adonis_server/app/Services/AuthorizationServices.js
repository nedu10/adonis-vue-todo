const AuthorizationError = use('App/Exceptions/AuthorizationErrorException')
const NotFoundError = use('App/Exceptions/NotFoundErrorException')

class AuthorizationServices {
    verifyAuthorizationPermission (resource, user) {
        console.log(resource)
        if (!resource) {
            console.log('am here')
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