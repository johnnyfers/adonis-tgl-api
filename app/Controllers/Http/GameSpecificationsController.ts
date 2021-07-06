import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GameSpecification from 'App/Models/GameSpecification'
import GameSpecificationValidator from 'App/Validators/GameSpecificationValidator'

export default class GameSpecificationsController {
  public async index() {
    const gameSpecifications = await GameSpecification.all()

    return gameSpecifications
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(GameSpecificationValidator)

      const gameSpecification = await GameSpecification.create(data)

      return gameSpecification
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const gameSpecification = await GameSpecification.findByOrFail('id', params.id)

      return gameSpecification
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const gameSpecification = await GameSpecification.findByOrFail('id', params.id)
      const data = await request.validate(GameSpecificationValidator)

      await gameSpecification.merge(data).save()

      return gameSpecification
    } catch (err) {
      return response.badRequest(err)
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const gameSpecification = await GameSpecification.findByOrFail('id', params.id)

      await gameSpecification.delete()
    } catch (err) {
      return response.badRequest(err.message)
    }
  }
}
