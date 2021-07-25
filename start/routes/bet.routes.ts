import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
    Route.resource('bets', 'BetsController').apiOnly()
    Route.get('filter', 'FilterBetsController.index')
}).middleware(['auth'])