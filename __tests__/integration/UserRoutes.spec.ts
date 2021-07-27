import User from 'App/Models/User'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', (group) => {
    group.before(async () => {
        const payload = {
            name: 'Admin',
            email: 'admin@adonisjs.com',
            password: 'Admin',
        }

        await User.create({ ...payload, isAdmin: true })
    })

    test('ensure user can be registered with valid credentials', async (assert) => {
        const response = await supertest(BASE_URL).post('/users').send({
            name: 'johnny',
            email: 'test@adonisjs.com',
            password: 'secret',
            password_confirmation: 'secret'
        })

        assert.equal(response.ok, true)
    })

    test('ensure an admin can get access to a list of users', async (assert) => {
        const response = await supertest(BASE_URL).get('/users')

        assert.equal(response.ok, true)
    })

    test('ensure user  user can be deleted', async (assert) => {
        const { body: { token } } = await supertest(BASE_URL).post('/sessions').send({
            email: 'admin@adonisjs.com',
            password: 'Admin'
        })

        const response = await supertest(BASE_URL)
        .delete('/users/2')
        .set('Authorization', `Bearer ${token}`)

        console.log(response)

        assert.equal(response.ok, true)
    })
})