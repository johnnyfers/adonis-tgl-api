import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User Http', () => {
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

    test('ensure an user can be updated', async (assert) => {
        const { body: { token } } = await supertest(BASE_URL).post('/sessions').send({
            email: 'test@adonisjs.com',
            password: 'secret'
        })

        const response = await supertest(BASE_URL)
        .put('/users')
        .send({
            name: 'teeeeste',
            email: 'testeee@adonisjs.com',
            password: 'teste'
        })
        .set('Authorization', `Bearer ${token}`)

        assert.equal(response.ok, true)
    })

    test('ensure user  user can be deleted', async (assert) => {
        const { body: { token } } = await supertest(BASE_URL).post('/sessions').send({
            email: 'admin@adonisjs.com',
            password: 'Admin'
        })

        const response = await supertest(BASE_URL)
        .delete('/users/1')
        .set('Authorization', `Bearer ${token}`)

        assert.equal(response.ok, true)
    })
})