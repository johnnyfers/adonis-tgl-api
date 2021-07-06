import Route from '@ioc:Adonis/Core/Route'

Route.post('users', 'UsersController.store')

Route.post('sessions', 'SessionsController.store')
