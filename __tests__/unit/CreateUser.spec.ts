import test from 'japa'
import User from '../../app/Models/User'

test.group('Create User', () => {

    test('ensure the user was saved in database', async (assert) => {
        const payload = {
            name: 'test',
            email: 'test@adonisjs.com',
            password: 'secret'
        }

        const user = await User.create(payload)
        
        assert.exists(user.id)
    })

    test('ensure user password gets hashed during save', async (assert) => {
        const payload = {
            name: 'test',
            email: 'test@adonisjs.com',
            password: 'secret'
        }

        const user = await User.create(payload)

        assert.notEqual(user.password, 'secret')
    })
})
