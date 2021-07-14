import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
    async index({ request }: HttpContextContract) {
        const { page } = request.qs()

        const users = await User.query()
            .paginate(page, 10)

        return users
    }

    async create({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)
            
            const userAlreadyExists = await User.findBy('email', data.email)

            if(userAlreadyExists){
                throw new Error('User already exists')
            }

            const user = await User.create(data)

            await Mail.send(
                message => {
                    message
                        .to(user!.email)
                        .from('johnny@adonis.com', 'Johhny | Luby')
                        .subject('Reset password')
                        .htmlView('main', {
                            loadNewAccount: true,
                            name: user!.name
                        })
                }
            )

            return user
        } catch (err) {
            return response.badRequest(err.message)
        }
    }

    async update({ request, response, auth }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)
            const user = await User.findByOrFail('id', auth.user?.id)

            await user.merge(data).save()

            return user
        } catch (err) {
            return response.badRequest(err)
        }
    }

    async show({ auth, response }: HttpContextContract) {
        try {
            const user = await User.findByOrFail('id', auth.user?.id)

            return user
        } catch (err) {
            console.log(err)
            return response.badRequest(err.message)
        }
    }

    async delete({ params, response }: HttpContextContract) {
        try {
            const user = await User.findByOrFail('id', params.id)

            return await user.delete()
        } catch (err) {
            return response.badRequest(err.message)
        }
    }
}
