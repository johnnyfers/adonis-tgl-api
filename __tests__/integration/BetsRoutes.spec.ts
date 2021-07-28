import Game from 'App/Models/Game'
import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let tokenAdmin: string

test.group('Bets Http', (group) => {
    group.before(async () => {
        const payload = {
            name: 'Admin',
            email: 'admin@adonisjs.com',
            password: 'Admin',
        }

        await User.create({ ...payload, isAdmin: true })

        const { body: { token } } = await supertest(BASE_URL).post('/sessions').send({
            email: 'admin@adonisjs.com',
            password: 'Admin'
        })

        tokenAdmin = token

        await Game.create({
            type: 'Lotomania',
            description: 'Escolha 4 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
            range: 50,
            price: 2.70,
            MaxNumber: 5,
            color: '#F79991',
            minCartValue: 30
        })
    })

    test('ensure an user can create many games', async (assert) => {
        const response = await supertest(BASE_URL)
            .post('/bets')
            .send({
                bets: [
                    {
                        game_id: 1,
                        numbers: '9, 26, 55, 67, 10',
                        date_string: '12/12/2021',
                        total_price: 2.5
                    },
                    {
                        game_id: 1,
                        numbers: '9, 26, 55, 67, 12',
                        date_string: '12/12/2021',
                        total_price: 2.0
                    }
                ]
            })
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })

    test('ensure an admin user can update a game', async (assert) => {
        const response = await supertest(BASE_URL)
            .put('/bets/1')
            .send({
                numbers: '1, 2, 3, 4, 10',
                date_string: '12/12/2021',
                total_price: 5
            })
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })

    test('ensure an user can get access to a list of bets', async (assert) => {
        const response = await supertest(BASE_URL)
            .get('/bets')
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })

    test('ensure an admin user can delete a game', async (assert) => {
        const response = await supertest(BASE_URL)
            .delete('/bets/1')
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })
})