import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('games', 'GamesController').apiOnly()
}).middleware(['auth'])