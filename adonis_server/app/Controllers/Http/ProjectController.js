'use strict'

const Database = use('Database')

const Project = Database.table('projects')

const Projects = use('App/Models/Project')

class ProjectController {
    async index ({ auth, response}) {
        const authUser = await auth.getUser()
        console.log(authUser.id)
        // const userProject = await authUser.
        const userProject = await Project.where('user_id', authUser.id)
        return response.status(200).json({
            Status: 'Success',
            Message: 'Successfully got all project',
            data: userProject
        })
    }
    async createProject ({ auth, request, response}) {
        const authUser = await auth.getUser()
        console.log(authUser.id)
        console.log(request.all())
        const {title, description} = request.all()
        // const userProject = await authUser.
        const newProject = new Projects()

        newProject.title = title,
        newProject.description = description,
        newProject.user_id = authUser.id

        const saveNewProject = await newProject.save()
        
        console.log(saveNewProject)
        return response.status(201).json({
            Status: 'Success',
            Message: 'Successfully save project',
            data: saveNewProject
        })
    }
}

module.exports = ProjectController
