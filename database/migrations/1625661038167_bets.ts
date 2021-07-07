import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bets extends BaseSchema {
  protected tableName = 'bets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('game_specification_id')
        .unsigned()
        .references('id').inTable('game_specifications')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('game_id')
        .unsigned()
        .references('id').inTable('games')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.boolean('was_played').nullable()

      table.string('numbers').notNullable()
      table.string('date_string').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
