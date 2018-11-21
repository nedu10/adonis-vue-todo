'use strict'

const Database = use('Database')

const Project = Database.table('projects')

const Projects = use('App/Models/Project')
const AuthorizationServices = use('App/Services/AuthorizationServices')

class ProjectController {
    async index ({ response}) {
        const userProject = await Projects.all()
        return response.status(200).json({
            Status: 'Success',
            Message: 'Successfully got all project',
            data: userProject
        })
    }
    async getCreatedProject ({ auth, response }) {
        const authUser = await auth.getUser()
        console.log(authUser.id)
        // const userProject = await authUser.
        const userProject = await Project.where('user_id', authUser.id).select('*')
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
    async updateProject( {auth, params, response, request} ) {
        const authUser = await auth.getUser()
        const { project_id } = params
        const {title, description} = request.body
        console.log(title+' thyuudfi '+description)
        const project = await Projects.find(project_id)
        AuthorizationServices.verifyAuthorizationPermission(project, authUser)
        console.log('see me here')
        const newValue = {
            title: (title) ? (title) : project.title,
            description: (description) ? description : project.description
        }
        console.log(newValue)
        const updatedProject = await Project.where("id", project_id).update(newValue)
        console.log('see me here >> ',updatedProject)
        return {
            Status: 'Success',
            Message: 'Successfully updated project',
            data: updatedProject
        }
    }
    async deleteProject ({auth, params, response}) {
        const authUser = await auth.getUser()
        const {project_id} = params
        const project = await Projects.find(project_id)
        AuthorizationServices.verifyAuthorizationPermission(project, authUser)
        const deleteProject = await project.delete()
        return response.status(200).json({
            Status: 'Success',
            Message: 'Successfully deleted project',
            data: deleteProject
        })

    }
}

module.exports = ProjectController
