import test from 'japa'
import Game from 'App/Models/Game'

test.group('Games CRUD', () => {

    test('ensure a game can be saved', async (assert) => {
        const payload = {
            type: 'Quina',
            description: 'Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
            range: 80,
            price: 2,
            max_number: 5,
            color: '#F79C31',
            min_cart_value: 30
        }

        const game = await Game.create(payload)

        assert.exists(game.id)
    })

    test('ensure a game can be listed', async (assert) => {
        const games = await Game.all()

        assert.exists(games.length)
    })

    test('ensure a game can be updated', async (assert) => {
        const game = await Game.findByOrFail('id', 1)

        const payload = {
            type: 'Lotomania',
            description: 'Escolha 4 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
            range: 50,
            price: 2.70,
            max_number: 5,
            color: '#F79991',
            min_cart_value: 30
        }

        await game.merge(payload).save()

        assert.equal(game.type, 'Lotomania')
    })

    test('ensure a game can be deleted', async (assert) => {
        const game = await Game.findByOrFail('id', 1)
        
        await game!.delete()
        
        assert.equal(game!.$isDeleted, true)
    })
})
