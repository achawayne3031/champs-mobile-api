import * as express from 'express'
const UserController = require('../controllers/userController')

const router = express.Router()

router.post('/create', UserController.create)
router.get('/users', UserController.users)
router.get('/users/:id', UserController.remove)
// router.put('/users/:id', UserController.update)

router.post('/users/:id', UserController.update)

module.exports = router
