import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
    Route.resource('game-specs', 'GameSpecificationsController')
}).middleware(['auth', 'UserAdmin'])
