import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto'
import Mail from '@ioc:Adonis/Addons/Mail'
import { DateTime } from 'luxon'
import moment from 'moment'

import User from 'App/Models/User'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'

export default class ForgotPassWordsController {
    async store({ request, response }: HttpContextContract) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            user.rememberMeToken = crypto.randomBytes(10).toString('hex')
            user.tokenCreatedAt = DateTime.local()

            await user.save()

            await Mail.send(
                message => {
                    message
                        .to(user!.email)
                        .from('johnny@adonis.com', 'Johhny | Luby')
                        .subject('Reset password')
                        .htmlView('forgot_password', {
                            email,
                            token: user!.rememberMeToken,
                            link: `${request.input('request_url')}?token=${user!.rememberMeToken}`
                        })
                }
            )

        } catch (err) {
            return response.badRequest(err)
        }
    }

    async update({ request, response }: HttpContextContract) {
        const { token, password } = await request.validate(ResetPasswordValidator)

        try {
            const user = await User.findByOrFail('remember_me_token', token)

            const tokenExpired = moment()
                .subtract('7', 'days')
                .isAfter(user.tokenCreatedAt)

            if (tokenExpired) {
                return response.status(401).send('expired token')
            }

            user.rememberMeToken = ''
            user.tokenCreatedAt = DateTime.local()
            user.password = password

            await user.save()

        } catch (err) {
            return response.badRequest(err)
        }
    }
}
