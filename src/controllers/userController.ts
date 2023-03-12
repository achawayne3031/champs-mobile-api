const passwordHash = require('password-hash')
import { errorRes } from '../response/error'
import { successRes } from '../response/success'
import { Request, Response } from 'express'
import { User } from '../entity/user'
import { json } from 'body-parser'
const AppDataSource = require('../database/datasource')
const { validateRegisterData } = require('../helper/helpers')
const JSON = require('@supercharge/json')

AppDataSource.initialize()

interface PostData {
  name: string
  email: string
  password: string
}

const UserController = {
  users: async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    try {
      const token = req.header('Authorization')
      const usersRepository = AppDataSource.getRepository(User)
      const users = await usersRepository.find({
        order: {
          id: 'DESC',
        },
      })

      return res.send(successRes(200, true, 'All Users', users, '', []))
    } catch (error) {
      return res.status(400).send(errorRes(400, false, 'Server error', error))
    }
  },

  create: async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')

    let reqBody = req.body
    reqBody = JSON.parse(Object.keys(reqBody)[0])

    try {
      const { error } = validateRegisterData(reqBody)
      if (error) {
        return res.send(errorRes(403, false, error.details[0].message, []))
      }

      let email = reqBody.email
      const usersRepository = AppDataSource.getRepository(User)

      const user = new User()
      user.name = reqBody.name
      user.email = reqBody.email
      const userRepository = AppDataSource.getRepository(User)
      const createData = await userRepository.save(user)

      if (!createData) {
        return res.send(errorRes(403, false, 'User not created', []))
      }

      return res.send(
        successRes(200, true, 'Registration was successful', [], '', []),
      )
    } catch (error) {
      return res.send(errorRes(400, false, 'Server error', error))
    }
  },

  remove: async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')

    console.log(req.params, 'hello me ')

    try {
      let id = req.params.id
      const usersRepository = AppDataSource.getRepository(User)
      const userData = await usersRepository.findOneBy({
        id: id,
      })

      if (userData == null) {
        return res.send(errorRes(403, false, 'Invalid user', []))
      }

      const removeData = await usersRepository.remove(userData)
      if (!removeData) {
        return res.send(errorRes(403, false, 'User not removed', []))
      }

      return res.send(
        successRes(200, true, 'User removed successfully', [], '', []),
      )
    } catch (error) {
      return res.send(errorRes(400, false, 'Server error', error))
    }
  },

  update: async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')

    let reqBody = req.body
    reqBody = JSON.parse(Object.keys(reqBody)[0])

    try {
      const { error } = validateRegisterData(reqBody)
      if (error) {
        return res.send(
          errorRes(403, false, 'Validation error.', error.details[0].message),
        )
      }

      let id = req.params.id
      const usersRepository = AppDataSource.getRepository(User)
      const userExist = await usersRepository.findOneBy({
        id: id,
      })

      if (userExist == null) {
        return res.send(errorRes(403, false, 'Invalid user', []))
      }

      let email = reqBody.email
      const userData = await usersRepository.findOneBy({
        email: email,
      })

      const updateData = await AppDataSource.createQueryBuilder()
        .update(User)
        .set({
          name: reqBody.name,
          email: reqBody.email,
        })
        .where('id = :id', { id: id })
        .execute()

      if (!updateData) {
        return res.send(errorRes(403, false, 'User not updated', []))
      }

      return res.send(
        successRes(200, true, 'User updated successfully', [], '', []),
      )
    } catch (error) {
      return res.send(errorRes(400, false, 'Server error', error))
    }
  },
}

module.exports = UserController
