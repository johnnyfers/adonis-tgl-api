import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

import BetValidator from 'App/Validators/BetValidator'
import Bet from 'App/Models/Bet'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import BetUpdateValidator from 'App/Validators/BetUpdateValidator'

export default class BetsController {
  public async index({ request, auth }: HttpContextContract) {
    const { page, listNumber } = request.qs()

    const bets = await Bet.query()
      .where('user_id', `${auth.user?.id}`)
      .preload('games')
      .orderBy('id', 'desc')
      .paginate(page, listNumber)

    const betsJSON = bets.serialize()

    return betsJSON
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', `${auth.user?.id}`)
      const payload = await request.validate(BetValidator)

      const bets = await Bet.createMany(
        payload.bets.map((item: {}) =>
          item = { ...item, userId: auth.user?.id })
      )

      let totalPrice = 0

      payload.bets.forEach((item) => {
        totalPrice += item.total_price
      })

      if (Env.get('NODE_ENV') !== 'testing') {
        await Mail.send(
          message => {
            message
              .to(user!.email)
              .from('johnny@adonis.com', 'Johhny | Luby')
              .subject('New Bet')
              .htmlView('main', {
                loadNewBet: true,
                totalPrice: totalPrice.toFixed(2).replace('.', ','),
                name: user!.name,
                link: 'www.tgl.com.dummy'
              })
          }
        )
      }

      return bets
    } catch (err) {
      return response.badRequest(err.message)
    }
  }

  public async show({ params }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)

    return bet
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const bet = await Bet.findByOrFail('id', `${params.id}`)
      const payload = await request.validate(BetUpdateValidator)

      await bet.merge(payload).save()

      return bet
    } catch (err) {
      return response.badRequest(err.message)
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const bet = await Bet.findByOrFail('id', `${params.id}`)

    return await bet.delete()
  }
}
