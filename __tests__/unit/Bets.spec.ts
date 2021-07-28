import Bet from 'App/Models/Bet'
import Game from 'App/Models/Game'
import User from 'App/Models/User'
import test from 'japa'


test.group('Bets CRUD', (group) => {
    group.before(async () => {
        const payload = {
            name: 'test',
            email: 'testGames@adonisjs.com',
            password: 'secret',
        }

        await User.create(payload)
    })

    group.before(async () => {
        const payload = {
            type: 'Mega-sena',
            description: 'Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
            range: 80,
            price: 2,
            max_number: 5,
            color: '#F79C31',
            min_cart_value: 30
        }
        
        await Game.create(payload)
    })

    test('ensure the many bets can be saved', async (assert) => {
        const payload = {
            bets: [
                {
                    game_id: 2,
                    numbers: '9, 26, 55, 67, 10',
                    date_string: '12/12/2021',
                    total_price: 2.5
                },
                {
                    game_id: 2,
                    numbers: '9, 26, 55, 67, 12',
                    date_string: '12/12/2021',
                    total_price: 2.0
                }
            ]
        }

        const bets = await Bet.createMany(
            payload.bets.map((item: {}) =>
                item = { ...item, userId: 2})
        )

        assert.exists(bets)
    })

    test('ensure a Bet can be listed', async (assert) => {
        const bets = await Bet.all()

        assert.exists(bets.length)
    })

    test('ensure a Bet can be updated', async (assert) => {
        const bet = await Bet.findByOrFail('id', 3)

        const payload = {
            numbers: '1, 2, 3, 4, 10',
            date_string: '12/12/2021',
            total_price: 5
        }

        await bet.merge(payload).save()

        assert.equal(bet.numbers, '1, 2, 3, 4, 10')
    })

    test('ensure a Bet can be deleted', async (assert) => {
        const bet = await Bet.findByOrFail('id', 3)

        await bet!.delete()

        assert.equal(bet!.$isDeleted, true)
    })
})
