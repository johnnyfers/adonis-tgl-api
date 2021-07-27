import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Authentication', (group) => {
    group.before(async () => {
        const payload = {
            name: 'test',
            email: 'testAuth@adonisjs.com',
            password: 'secret'
        }

     await User.create(payload)
    })

    test('ensure user can be authenticated with valid credentials', async (assert) => {
        const response = await supertest(BASE_URL).post('/sessions').send({
            email: 'testAuth@adonisjs.com',
            password: 'secret'
        })

        assert.equal(response.statusCode, 200)
    })
})