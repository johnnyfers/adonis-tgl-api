import Route from '@ioc:Adonis/Core/Route'

Route.get('user', 'UsersController.show')
    .middleware(['auth'])

Route.get('users', 'UsersController.index')

Route.delete('users/:id', 'UsersController.delete')
    .middleware(['auth', 'UserAdmin'])

Route.put('users', 'UsersController.update')
    .middleware(['auth'])

Route.post('users', 'UsersController.create')

Route.post('reset', 'ForgotPasswordsController.store')

Route.put('reset', 'ForgotPasswordsController.update')

Route.post('sessions', 'SessionsController.store')

//teste