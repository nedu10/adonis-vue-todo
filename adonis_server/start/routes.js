'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })

//setting up authentication route
Route.group(() => {
  Route.post('/register', 'UserController.register')
  Route.post('/login', 'UserController.login')
})
.prefix('/api/auth')

//setting up project route
Route.group(() => {
  Route.get('/', 'ProjectController.index').middleware(['auth'])
  Route.get('/created_project', 'ProjectController.getCreatedProject').middleware(['auth'])
  Route.post('/', 'ProjectController.createProject').middleware(['auth'])
  Route.put('/:project_id', 'ProjectController.updateProject').middleware(['auth'])
  Route.delete('/:project_id', 'ProjectController.deleteProject').middleware(['auth'])
})
.prefix('/api/projects')

