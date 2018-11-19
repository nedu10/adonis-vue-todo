'use strict'

const User = use('App/Models/User')

class UserController {
    
    async register ( {request, response} ){
        const {first_name, last_name, email, username, password} = request.all()

        const new_user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password
        })
        return response.status(201).json({
            Status: 'success',
            Message: 'Successfully created new user',
            data: new_user
        })
    }

    async login ( {request, response, auth} ){
        const {username, password} = request.all()

        const check_login = await auth.attempt(username, password)
        return response.status(201).json({
            Status: 'success',
            Message: 'Successfully logged in new user',
            data: check_login
        })
    }
}

module.exports = UserController
