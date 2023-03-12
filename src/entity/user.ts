import { Column, Entity } from 'typeorm'
import { Basic } from './utils/basic'

@Entity()
export class User extends Basic {
  @Column()
  name!: string

  @Column({
    unique: true,
  })
  email!: string
}
