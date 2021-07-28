import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('games', 'GamesController.store')
    Route.put('games/:id', 'GamesController.update')
    Route.delete('games/:id', 'GamesController.destroy')
}).middleware(['auth', 'UserAdmin'])

Route.get('games', 'GamesController.index')
