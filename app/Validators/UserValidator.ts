import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		name: schema.string({trim: true}),
		
		email: schema.string({trim: true}, [
			rules.email()
		]),

		password: schema.string({trim: true})
	})

	public messages = {}
}
