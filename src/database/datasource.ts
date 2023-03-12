import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entity/user'
import { errorRes } from '../response/error'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'champs_mobile',
  entities: [User],
  synchronize: true,
  logging: false,
})

module.exports = AppDataSource
