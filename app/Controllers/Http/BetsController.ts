import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import BetValidator from 'App/Validators/BetValidator'
import Bet from 'App/Models/Bet'

export default class BetsController {
  public async index({ request, params }: HttpContextContract) {
    const { page } = request.qs()

    const bets = await Bet.query()
      .where('game_specification_id', params.game_spec_id)
      .preload('specifications')
      .paginate(page, 15)

    const betsJSON = bets.serialize()

    return betsJSON
  }

  public async store({ request, response, params, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(BetValidator)

      const bet = await Bet.create({ ...payload, gameSpecificationId: params.game_spec_id, userId: auth.user?.id })

      return bet

    } catch (err) {
      return response.badRequest(err.message)
    }
  }

  public async create({ }: HttpContextContract) {
  }

  public async show({ params }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)

    return bet
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const payload = await request.validate(BetValidator)

      const bet = await Bet.findByOrFail('id', params.id)

      await bet.merge(payload).save()

      return bet

    } catch (err) {
      return response.badRequest(err.message)
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const bet = await Bet.findOrFail(params.id)

    return await bet.delete()
  }
}
