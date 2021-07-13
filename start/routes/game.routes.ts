import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('games', 'GamesController.store')
    Route.put('games', 'GamesController.update')
    Route.delete('games', 'GamesController.destroy')
}).middleware(['auth', 'UserAdmin'])

Route.get('games', 'GamesController.index')
