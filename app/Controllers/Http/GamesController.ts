import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'
import Game from 'App/Models/Game'

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.qs()

    const games = await Game.query()
      .preload('user')
      .preload('bets')
      .paginate(page, 15)

    const gamesJSON = games.serialize()

    return gamesJSON
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const data = request.only(['total_price'])
      const bets = await Bet.query().where('user_id', `${auth.user?.id}`).where('was_played', false)

      console.log(bets.map(bet => bet.$attributes))

      const game = await Game.create({ ...data, userId: auth.user?.id })

      await Bet.query().where('user_id', `${auth.user?.id}`).where('was_played', false).delete()
      await game.related('bets').createMany(bets.map(bet => bet.$attributes))
      await game.load('bets')

      game.bets.map(bet => bet.serialize())

      return game

    } catch (err) {
      return response.badRequest(err.message)
    }
  }

  public async create({ }: HttpContextContract) { }

  public async show({ params, auth, response }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail('id', params.id)

      if (game.userId !== auth.user?.id) {
        throw new Error('invalid request')
      }

      await game.load('user')
      await game.load('user')

      return game

    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const data = await request.input('total_price')
      const game = await Game.findByOrFail('id', params.id)
      const bets = await Bet.all()

      if (game.userId !== auth.user?.id) {
        throw new Error('invalid request')
      }

      await Bet.query().where('user_id', `${auth.user?.id}`).where('was_played', false).delete()
      await game.related('bets').updateOrCreateMany(bets.map(bet => bet.$attributes))
      await game.load('bets')

      game.bets.map(bet => bet.serialize())

      await game.merge(data).save()

      return game
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail('id', params.id)

      if (game.userId !== auth.user?.id) {
        throw new Error('invalid request')
      }

      return await game.delete()
    } catch (err) {
      return response.badRequest(err)
    }
  }
}
