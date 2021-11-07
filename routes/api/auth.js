const express = require('express')
const router = express.Router()

const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

router.post('/register', validation(joiSchema), controllerWrapper(ctrl.register))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

module.exports = router
