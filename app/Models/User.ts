import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import { DateTime } from 'luxon'

import Game from './Game'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public isAdmin: boolean

  @column.dateTime()
  public tokenCreatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Game)
  public games: HasMany<typeof Game>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
