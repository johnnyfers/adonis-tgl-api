import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BetValidator {
  constructor (protected ctx: HttpContextContract) { }
  
  public schema = schema.create({
	  numbers: schema.string(),
	  date_string: schema.string(),
  })

  public messages = {}
}