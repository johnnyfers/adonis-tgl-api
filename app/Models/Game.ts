import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Bet from './Bet'

import User from './User'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public totalPrice: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Bet)
  public bets: HasMany<typeof Bet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}