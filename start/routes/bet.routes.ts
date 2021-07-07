import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
    Route.resource('game-specs.bets', 'BetsController').apiOnly()
}).middleware(['auth'])