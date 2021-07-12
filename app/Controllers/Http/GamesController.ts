import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'
import GameValidator from 'App/Validators/GameValidator'

export default class GamesController {
  public async index() {
    const games = await Game.all()

    return games
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(GameValidator)

      const game = await Game.create(data)

      return game
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail('id', params.id)

      return game
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail('id', params.id)
      const data = await request.validate(GameValidator)

      await game.merge(data).save()

      return game
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const game = await Game.findByOrFail('id', params.id)

      await game.delete()
    } catch (err) {
      return response.badRequest(err.message)
    }
  }
}
