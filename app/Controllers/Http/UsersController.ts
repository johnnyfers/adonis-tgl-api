import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
    async index() {
        const users = await User.all()

        return users
    }

    async store({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)

            const user = await User.create(data)

            return user
        } catch (err) {
            return response.badRequest(err)
        }
    }

    async update({ request, response, params }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)
            const user = await User.findByOrFail('id', params)

            await user.merge(data).save()

            return user
        } catch (err) {
            return response.badRequest(err)
        }
    }

    async delete({ params, response }: HttpContextContract) {
        try {
            const user = await User.findByOrFail('id', params.id)

            return user.delete()
        } catch (err) {
            return response.badRequest(err)
        }
    }
}
