const express = require('express')
const router = express.Router()

const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:id', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:id', authenticate, controllerWrapper(ctrl.removeContact))

router.put('/:id', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:id', authenticate, controllerWrapper(ctrl.updateStatusContact))

module.exports = router
