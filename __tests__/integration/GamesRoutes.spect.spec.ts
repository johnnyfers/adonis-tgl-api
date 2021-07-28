import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

let tokenAdmin: string

test.group('Games Http', (group) => {
    group.before(async () => {
        const { body: { token } } = await supertest(BASE_URL).post('/sessions').send({
            email: 'admin@adonisjs.com',
            password: 'Admin'
        })

        tokenAdmin = token
    })

    test('ensure an admin user can create a game with valid credentials', async (assert) => {
        const response = await supertest(BASE_URL)
            .post('/games')
            .send({
                type: 'Lotomania',
                description: 'Escolha 4 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
                range: 50,
                price: 2.70,
                max_number: 5,
                color: '#F79991',
                min_cart_value: 30
            })
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })

    test('ensure an admin user can update a game', async (assert) => {
        const response = await supertest(BASE_URL)
            .put('/games/1')
            .send({
                type: 'Quina',
                description: 'Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.',
                range: 80,
                price: 2,
                max_number: 5,
                color: '#F79C31',
                min_cart_value: 30
            })
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })

    test('ensure an user can get access to a list of games', async (assert) => {
        const response = await supertest(BASE_URL).get('/games')

        assert.equal(response.ok, true)
    })

    test('ensure an admin user can delete a game', async (assert) => {
        const response = await supertest(BASE_URL)
            .delete('/games/1')
            .set('Authorization', `Bearer ${tokenAdmin}`)

        assert.equal(response.ok, true)
    })
})