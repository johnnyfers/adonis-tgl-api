import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
    Route.resource('gameSpecs', 'GameSpecificationsController').apiOnly()
}).middleware(['auth', 'UserAdmin'])
