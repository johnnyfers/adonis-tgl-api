import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {

    if (auth.user?.isAdmin) {
      return await next()
    }
    
    return response.send('User unanthorized')
  }
}
