import Route from '@ioc:Adonis/Core/Route'

Route.get('users/:id', 'UsersController.show')
    .middleware(['auth', 'UserAdmin'])

Route.get('users', 'UsersController.index')
    .middleware(['auth', 'UserAdmin'])

Route.delete('users/:id', 'UsersController.delete')
    .middleware(['auth', 'UserAdmin'])

Route.put('users/:id', 'UsersController.update')
    .middleware(['auth'])
    
Route.post('users', 'UsersController.store')

Route.post('sessions', 'SessionsController.store')

Route.post('reset', 'ForgotPasswordsController.store')
Route.put('reset', 'ForgotPasswordsController.update')