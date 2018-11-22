'use strict'

const Database = use('Database')

const Task = Database.table('tasks')
const Projects = use('App/Models/Project')
const Tasks = use('App/Models/Task')
const AuthorizationServices = use('App/Services/AuthorizationServices')

class TaskController {
    async getAllTask ({auth, response}) {
        const authUser = await auth.getUser()

        const task = await Tasks.all()

        return response.status(200).json({
            Status: 'Success',
            Message: 'Successfully fetch all task',
            data: task
        })
    }
    async getCreatedTask ({auth, params, response}) {
        const authUser = await auth.getUser()
        const {project_id} = params

        const project = await Projects.find(project_id)
        AuthorizationServices.verifyAuthorizationPermission(project, authUser)

        const createdTask = await Task.where('project_id', project_id).select('*')
  
        return response.status(200).json({
            Status: 'Success',
            Message: 'Successfully fetch all created task',
            data: createdTask
        })
    }
    async createTask ({auth, params, response, request}) {  
        const authUser = await auth.getUser()
        const {description} = request.all()
        const {project_id} = params

        const project = await Projects.find(project_id)
        AuthorizationServices.verifyAuthorizationPermission(project, authUser)

        const newTask = new Tasks()
        newTask.description = description
        newTask.project_id = project.id

        const saveNewTask = await newTask.save()
        
        console.log(saveNewTask)
        return response.status(201).json({
            Status: 'Success',
            Message: 'Successfully Created Task',
            data: saveNewTask
        })
    }
    async updateTask ({auth, params, response, request}) {
        const authUser = await auth.getUser()
        var {description, completed} = request.all()
        const {project_id, task_id} = params
        console.log(authUser.id, project_id, task_id);
        
        const project = await Projects.find(project_id)
        AuthorizationServices.verifyAuthorizationPermission(project, authUser)

        var task = await Tasks.find(task_id)
        console.log(task.project_id)

        if(Number(task.project_id) !== Number(project_id)) {
            return response.status(401).json({
                Status: 'Failed',
                Message: 'You can\'t edit this post',
            }) 
        }
        var newDescription = (description) ? description : task.description
        var newCompleted = (completed) ? completed : task.completed
        task.description = newDescription
        task.completed = newCompleted

        const updateTask = await task.save()

        return response.status(201).json({
            Status: 'Success',
            Message: 'Successfully updated task',
            data: updateTask
        })
    }
    async deleteTask ({auth, params, response}) {
        const authUser = await auth.getUser()
        const {project_id, task_id} = params
        console.log(authUser.id, project_id, task_id);
        
        const project = await Projects.find(project_id)
        AuthorizationServices.verifyAuthorizationPermission(project, authUser)

        var task = await Tasks.find(task_id)

        if(Number(task.project_id) !== Number(project_id)) {
            return response.status(401).json({
                Status: 'Failed',
                Message: 'You can\'t delete this post',
            }) 
        }

        const deleteTask = await task.delete()

        return response.status(201).json({
            Status: 'Success',
            Message: 'Successfully deleted task',
            data: deleteTask
        })
    }
}

module.exports = TaskController
