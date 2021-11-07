const express = require('express')
const router = express.Router()

const { controllerWrapper, authenticate, upload } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify', controllerWrapper(ctrl.reVerify))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
